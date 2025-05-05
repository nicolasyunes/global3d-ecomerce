
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Usuario intentó acceder a una ruta inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  // Comprueba si estamos intentando acceder a una página de producto
  const isProductRoute = location.pathname.includes("/products/");

  return (
    <div className="container py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        
        {isProductRoute ? (
          <>
            <p className="text-xl text-gray-600 mb-6">Producto No Encontrado</p>
            <p className="text-gray-500 mb-8">
              El producto que estás buscando puede haber sido eliminado, haber cambiado de nombre o no estar disponible temporalmente.
            </p>
          </>
        ) : (
          <p className="text-xl text-gray-600 mb-6">¡Ups! Página no encontrada</p>
        )}
        
        <Link to={isProductRoute ? "/shop" : "/"}>
          <Button className="px-6">
            {isProductRoute ? "Continuar Comprando" : "Volver al Inicio"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
