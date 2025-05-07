import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SupabaseTest() {
  const [testResult, setTestResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('profiles').select('*').limit(1)
      if (error) throw error
      setTestResult('✅ Conexión exitosa con Supabase')
    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setLoading(false)
    }
  }

  const testAuth = async () => {
    setLoading(true)
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      setTestResult(`✅ Sesión actual: ${session ? 'Activa' : 'No hay sesión'}`)
    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Test de Supabase</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={testConnection} disabled={loading}>
            Test Conexión
          </Button>
          <Button onClick={testAuth} disabled={loading}>
            Test Auth
          </Button>
        </div>
        {testResult && (
          <p className="text-sm">{testResult}</p>
        )}
      </CardContent>
    </Card>
  )
} 