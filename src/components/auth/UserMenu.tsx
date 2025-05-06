
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

interface UserData {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

const UserMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.isAuthenticated) {
          setUser(parsedUser);
        }
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);
  
  const handleLogout = () => {
    // Guardar el carrito actual en localStorage antes de cerrar sesión
    if (user) {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        localStorage.setItem(`cart_${user.email}`, cartData);
      }
    }
    
    // Eliminar datos de usuario
    localStorage.removeItem("user");
    setUser(null);
    
    toast.success("Sesión cerrada correctamente");
    navigate("/");
  };
  
  if (!user) {
    return (
      <Link to="/login">
        <Button variant="ghost" size="icon" aria-label="Cuenta">
          <User size={20} />
        </Button>
      </Link>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Cuenta de usuario">
          <User size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="w-full cursor-pointer flex items-center" to="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Mi perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="w-full cursor-pointer flex items-center" to="/orders">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Mis pedidos</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
