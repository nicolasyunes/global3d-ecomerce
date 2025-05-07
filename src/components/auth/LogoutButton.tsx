import { useAuth } from '@/lib/AuthContext'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const { signOut } = useAuth()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => signOut()}
      className="hover:bg-destructive hover:text-destructive-foreground"
    >
      <LogOut className="h-5 w-5" />
    </Button>
  )
} 