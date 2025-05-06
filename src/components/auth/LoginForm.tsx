
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Verificar si el usuario ya está logueado
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.isAuthenticated) {
        navigate("/");
        toast.info(`Ya has iniciado sesión como ${user.name}`);
      }
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simular login (luego se implementará con Supabase)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar si el usuario existe en localStorage (simulación)
      // En un caso real, esto se haría con Supabase
      
      // Por ahora, simplemente autenticar al usuario
      localStorage.setItem("user", JSON.stringify({
        id: `user-${Date.now()}`,
        email: formData.email,
        name: formData.email.split('@')[0], // Nombre provisional
        isAuthenticated: true
      }));
      
      toast.success("Inicio de sesión exitoso");
      
      // También vamos a recuperar el carrito del localStorage y asignarlo al usuario
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        const cart = JSON.parse(cartData);
        localStorage.setItem(`cart_${formData.email}`, JSON.stringify(cart));
      }
      
      navigate("/");
    } catch (error) {
      toast.error("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
        <CardDescription>
          Ingresa tus datos para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-0 h-full"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Crear cuenta
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
