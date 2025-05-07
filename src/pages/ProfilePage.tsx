import { useAuth } from '@/lib/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

function ProfilePage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Mi Perfil</CardTitle>
            <CardDescription>Información de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Email</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">ID de Usuario</h3>
                <p className="text-sm text-muted-foreground">{user?.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}

export default ProfilePage 