import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

function OrdersPage() {
  return (
    <ProtectedRoute>
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Mis Pedidos</CardTitle>
            <CardDescription>Historial de tus compras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground">
              No tienes pedidos aún
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}

export default OrdersPage 