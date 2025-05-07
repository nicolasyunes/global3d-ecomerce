
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import ProductGrid from "../components/products/ProductGrid";
import { supabase } from "../lib/supabaseClient";

const categoryNames: Record<string, string> = {
  "figurines": "Figuras",
  "home-decor": "Decoración",
  "gadgets": "Accesorios",
  "custom": "Diseños Personalizados"
};



const fetchCategoryProducts = async (categoryId: string) => {
  console.log('fetchCategoryProducts ➔ categoryId:',categoryId);

  const { data, error } = await supabase
  .from('products')
  .select()
    if (error) throw error;
  
  return data;
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  console.log('CategoryId:', categoryId);
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => fetchCategoryProducts(categoryId!),
    enabled: !!categoryId,
  });

  const categoryName = categoryId ? (categoryNames[categoryId] || categoryId) : "";

  return (
    <div className="container py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="/categories">Categorías</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem active>{categoryName}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mt-6 mb-8">{categoryName}</h1>
      {isLoading ? (
        <div className="text-center py-12">Cargando productos111111...</div>
      ) : isError ? (
        <div className="text-center py-12 text-red-500">Error al cargar los productos</div>
      ) : (
        <ProductGrid products={products || []} />
      )}
    </div>
  );
};

export default CategoryPage;
