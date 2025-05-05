
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface ProductCardProps {
  product: ProductProps;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} añadido al carrito!`);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="product-card h-full border overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-2">{product.name}</h3>
          <div className="flex justify-between items-center mt-2">
            <p className="font-bold text-primary">${product.price.toFixed(2)}</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-full w-8 h-8 p-0"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              <span className="sr-only">Añadir al carrito</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
