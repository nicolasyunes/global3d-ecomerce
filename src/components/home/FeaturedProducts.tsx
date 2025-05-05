
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

// Define types for our products
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Dragón Articulado",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1599689018034-48e2ead82951?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "figurines"
  },
  {
    id: "2",
    name: "Maceta Geométrica",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "home-decor"
  },
  {
    id: "3",
    name: "Soporte para Celular",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "gadgets"
  },
  {
    id: "4",
    name: "Llavero Personalizado",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "custom"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Productos Destacados</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <Card className="product-card h-full border overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-bold text-primary">${product.price.toFixed(2)}</p>
                    <Button size="sm" variant="outline" className="rounded-full w-8 h-8 p-0">
                      <ShoppingCart size={16} />
                      <span className="sr-only">Añadir al carrito</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/shop">Ver Todos los Productos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
