import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart/CartItem";
import { ArrowRight, LogIn } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { useAuth } from "@/lib/AuthContext";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const { user } = useAuth();
  const shipping = total > 50 ? 0 : 5.99;

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };
  
  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  return (
    <div className="container py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem active>Carrito</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <h1 className="text-3xl font-bold mt-6 mb-8">Tu Carrito</h1>
      
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="space-y-1">
              {items.map((item) => (
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
              <h2 className="text-xl font-bold">Resumen del Pedido</h2>
              
              <div className="space-y-2 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t my-4 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(total + shipping).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Impuestos incluidos</p>
                </div>
              </div>

              {user ? (
                <Button className="w-full" asChild>
                  <Link to="/checkout">
                    Proceder al Pago
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button className="w-full" asChild>
                  <Link to="/login">
                    Iniciar Sesión para Comprar
                    <LogIn className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
          <p className="text-muted-foreground mb-8">
            Agrega algunos productos a tu carrito para comenzar a comprar.
          </p>
          <Button asChild>
            <Link to="/shop">Ver Productos</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
