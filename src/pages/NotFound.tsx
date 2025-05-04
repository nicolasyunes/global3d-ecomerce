
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Check if we're trying to access a product page
  const isProductRoute = location.pathname.includes("/products/");

  return (
    <div className="container py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        
        {isProductRoute ? (
          <>
            <p className="text-xl text-gray-600 mb-6">Product Not Found</p>
            <p className="text-gray-500 mb-8">
              The product you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </>
        ) : (
          <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        )}
        
        <Link to={isProductRoute ? "/shop" : "/"}>
          <Button className="px-6">
            {isProductRoute ? "Continue Shopping" : "Return to Home"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
