
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({
  id,
  name,
  price,
  quantity,
  image,
  onQuantityChange,
  onRemove
}: CartItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setItemQuantity(newQuantity);
      onQuantityChange(id, newQuantity);
    }
  };

  return (
    <div className="flex items-center py-4 border-b">
      <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      
      <div className="ml-4 flex-grow">
        <Link to={`/products/${id}`}>
          <h3 className="font-medium hover:text-primary transition-colors">{name}</h3>
        </Link>
        <p className="text-primary font-bold mt-1">${price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-20">
          <Input
            type="number"
            min="1"
            value={itemQuantity}
            onChange={handleQuantityChange}
            className="h-8 text-center"
          />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <X size={18} />
          <span className="sr-only">Remove</span>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
