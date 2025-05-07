import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import ProductGrid from "@/components/products/ProductGrid";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  in_stock: boolean;
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    console.log('SUPABASE:', supabase);
    console.log('ENV:', import.meta.env);
    const fetchProducts = async () => {
      console.log("entro por fetchProducts");
      try {
        const res = await fetch('https://rejhhqvqvroaidfppcbn.supabase.co/rest/v1/products', {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          }
        });
        const json = await res.json();
        console.log('FETCH MANUAL:', json);
        setProducts(json || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="container py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem active>Tienda</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <h1 className="text-3xl font-bold mt-6 mb-8">Todos los Productos</h1>
      
      {loading ? (
        <div className="text-center py-12">Cargando productos...</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default ShopPage;
