import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartContext";
import { toast } from "sonner";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, category });
    toast.success("Producto agregado al carrito");
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/products/${id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-sm text-gray-500 mb-2">{category}</p>
          <p className="text-xl font-bold text-gray-900">${price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}
