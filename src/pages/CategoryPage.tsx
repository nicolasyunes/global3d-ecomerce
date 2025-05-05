
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import ProductGrid from "@/components/products/ProductGrid";

// Datos de productos - en una aplicación real, esto vendría de una API
const allProducts = [
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
  },
  {
    id: "5",
    name: "Baby Yoda",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1635405074683-96d6b5bbd844?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "figurines"
  },
  {
    id: "6",
    name: "Maceta Triangular",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1604066867775-43f48e3957d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "home-decor"
  },
  {
    id: "7",
    name: "Organizador de Cables",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1544721241-3b750354a6a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "gadgets"
  },
  {
    id: "8",
    name: "Placa para Mascotas",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1623387641568-d0d1dd7f3f03?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "custom"
  }
];

const categoryNames: Record<string, string> = {
  "figurines": "Figuras",
  "home-decor": "Decoración",
  "gadgets": "Accesorios",
  "custom": "Diseños Personalizados"
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const products = allProducts.filter(
    product => categoryId && product.category === categoryId
  );
  
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
      
      <ProductGrid products={products} />
    </div>
  );
};

export default CategoryPage;
