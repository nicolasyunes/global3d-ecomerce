
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart/CartItem";
import { ArrowRight } from "lucide-react";

// Sample cart items data - in a real app, this would come from state management
const initialCartItems = [
  {
    id: "1",
    name: "Dragon Figurine",
    price: 29.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1599689018034-48e2ead82951?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2",
    name: "Geometric Vase",
    price: 24.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "7",
    name: "Cable Organizer",
    price: 12.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1544721241-3b750354a6a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(items =>
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="container py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem active>Cart</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <h1 className="text-3xl font-bold mt-6 mb-8">Your Cart</h1>
      
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="space-y-1">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  image={item.image}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          </div>
          
          <div>
            <div className="border rounded-lg p-6 space-y-4 sticky top-24">
              <h2 className="text-xl font-bold">Order Summary</h2>
              
              <div className="space-y-2 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t my-4 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Tax included</p>
                </div>
              </div>
              
              <Button className="w-full" asChild>
                <Link to="/checkout">
                  Checkout <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/shop">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
