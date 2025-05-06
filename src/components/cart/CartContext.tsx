
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Definir tipos
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  total: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  
  // Cargar el carrito del usuario actual cuando cambia el usuario
  useEffect(() => {
    const userData = localStorage.getItem('user');
    
    if (userData) {
      const user = JSON.parse(userData);
      
      if (user.isAuthenticated) {
        setCurrentUser(user.email);
        
        // Cargar el carrito específico del usuario
        const userCartKey = `cart_${user.email}`;
        const userCartData = localStorage.getItem(userCartKey);
        
        if (userCartData) {
          setCartItems(JSON.parse(userCartData));
        } else {
          // Si no hay carrito específico, usar el carrito general (si existe)
          const generalCartData = localStorage.getItem('cart');
          if (generalCartData) {
            setCartItems(JSON.parse(generalCartData));
          } else {
            setCartItems([]);
          }
        }
      } else {
        loadGeneralCart();
      }
    } else {
      loadGeneralCart();
    }
  }, []);
  
  // Cargar el carrito general (usuario no autenticado)
  const loadGeneralCart = () => {
    setCurrentUser(null);
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    } else {
      setCartItems([]);
    }
  };
  
  // Guardar el carrito cuando cambia
  useEffect(() => {
    if (cartItems.length === 0) return;
    
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser}`, JSON.stringify(cartItems));
    }
    
    // Siempre guardar en el carrito general también para usuarios no autenticados
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems, currentUser]);
  
  // Funciones del carrito
  const addItem = (item: CartItem) => {
    setCartItems(prevItems => {
      // Verificar si el item ya está en el carrito
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Actualizar cantidad si ya existe
        toast.success(`Cantidad actualizada: ${item.name}`);
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Agregar nuevo item
        toast.success(`Agregado al carrito: ${item.name}`);
        return [...prevItems, item];
      }
    });
  };
  
  const removeItem = (itemId: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === itemId);
      if (itemToRemove) {
        toast.info(`Eliminado del carrito: ${itemToRemove.name}`);
      }
      return prevItems.filter(item => item.id !== itemId);
    });
  };
  
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    if (currentUser) {
      localStorage.removeItem(`cart_${currentUser}`);
    }
    localStorage.removeItem('cart');
    toast.info('Carrito vaciado');
  };
  
  // Calcular totales
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const value = {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    total,
    totalItems,
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
