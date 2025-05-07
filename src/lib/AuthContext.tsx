import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'

interface AuthContextType {
  user: User | null
  session: Session | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      // Si el usuario está autenticado, verificar su perfil
      if (session?.user) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error checking profile:', profileError)
          }

          // Si no existe el perfil, intentar crearlo
          if (!profile) {
            const { error: insertError } = await supabase.from('profiles').insert([
              {
                id: session.user.id,
                username: session.user.email?.split('@')[0] || '',
                full_name: '',
                avatar_url: '',
                updated_at: new Date().toISOString(),
              },
            ])

            if (insertError) {
              console.error('Error creating profile:', insertError)
            }
          }
        } catch (error) {
          console.error('Error in profile management:', error)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Verificar si existe el perfil
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error checking profile:', profileError)
        }

        // Si no existe el perfil, crearlo
        if (!profile) {
          const { error: insertError } = await supabase.from('profiles').insert([
            {
              id: data.user.id,
              username: email.split('@')[0],
              full_name: '',
              avatar_url: '',
              updated_at: new Date().toISOString(),
            },
          ])

          if (insertError) {
            console.error('Error creating profile:', insertError)
          }
        }
      }

      toast.success('Inicio de sesión exitoso')
      
      // Redirigir al usuario a la página anterior o a la página principal
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Error during sign in:', error)
      toast.error(error instanceof Error ? error.message : 'Error al iniciar sesión')
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Crear el perfil inmediatamente después del registro
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: data.user.id,
            username: email.split('@')[0],
            full_name: '',
            avatar_url: '',
            updated_at: new Date().toISOString(),
          },
        ])

        if (profileError) {
          console.error('Error creating profile:', profileError)
        }
      }

      toast.success('Registro exitoso. Por favor, verifica tu email.')
      navigate('/login')
    } catch (error) {
      console.error('Error during sign up:', error)
      toast.error(error instanceof Error ? error.message : 'Error al registrarse')
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Limpiar el estado local
      setUser(null)
      setSession(null)
      
      toast.success('Sesión cerrada correctamente')
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error during sign out:', error)
      toast.error(error instanceof Error ? error.message : 'Error al cerrar sesión')
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 