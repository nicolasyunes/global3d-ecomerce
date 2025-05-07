import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/components/cart/CartContext";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features?: string[];
  specifications?: { name: string; value: string }[];
  in_stock: boolean;
}

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) {
          throw new Error("No product ID provided");
        }

        // Primero intentamos buscar por UUID
        let { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        // Si no encontramos por UUID, intentamos por el ID numérico
        if (error && error.code === '22P02') {
          const { data: numericData, error: numericError } = await supabase
            .from('products')
            .select('*')
            .eq('numeric_id', parseInt(productId))
            .single();

          if (numericError) {
            throw numericError;
          }
          data = numericData;
        } else if (error) {
          throw error;
        }

        if (!data) {
          throw new Error("Product not found");
        }

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error al cargar el producto");
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  const handleAddToCart = () => {
    if (product) {
      // Solo pasamos las propiedades necesarias al carrito
      const cartProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      };
      addToCart(cartProduct);
      toast.success("Producto agregado al carrito");
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Producto no encontrado</h2>
        <p className="mt-2 text-gray-600">El producto que buscas no existe o ha sido removido.</p>
        <Button onClick={() => navigate('/shop')} className="mt-4">
          Volver a la tienda
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="/shop">Shop</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href={`/categories/${product.category}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem active>{product.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>
          
          {product.features && product.features.length > 0 && (
            <div className="space-y-2">
              <p className="font-medium">Características:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex gap-4 items-center">
            <div className="w-24">
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="text-center"
              />
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              className="flex-1"
              disabled={!product.in_stock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> 
              {product.in_stock ? 'Agregar al carrito' : 'Sin stock'}
            </Button>
            
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Agregar a favoritos</span>
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <p className={`text-sm ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
              {product.in_stock ? 'En stock' : 'Sin stock'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
            <TabsTrigger value="shipping">Envío</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-6 border rounded-md mt-2">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              {product.features && product.features.length > 0 && (
                <>
                  <h3>Características</h3>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="p-6 border rounded-md mt-2">
            <div className="divide-y">
              {product.specifications && product.specifications.map((spec, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 py-3">
                  <div className="font-medium">{spec.name}</div>
                  <div className="md:col-span-2 text-muted-foreground">{spec.value}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="p-6 border rounded-md mt-2">
            <div className="prose max-w-none">
              <h3>Información de envío</h3>
              <p>Enviamos nuestros productos impresos en 3D a todo el mundo usando servicios de entrega confiables.</p>
              <ul>
                <li>Envío estándar: 5-7 días hábiles</li>
                <li>Envío express: 2-3 días hábiles</li>
                <li>Envío gratis en pedidos superiores a $50</li>
              </ul>
              <p>Todos los productos son cuidadosamente empaquetados para garantizar que lleguen en perfecto estado.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
