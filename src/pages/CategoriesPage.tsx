
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";

// Define types for our categories
interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  productCount: number;
}

const categories: Category[] = [
  {
    id: "figurines",
    name: "Figuras",
    image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Personajes coleccionables y modelos detallados para exhibición.",
    productCount: 24
  },
  {
    id: "home-decor",
    name: "Decoración",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Objetos hermosos y funcionales para mejorar tu espacio.",
    productCount: 18
  },
  {
    id: "gadgets",
    name: "Accesorios",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Herramientas útiles y accesorios para uso diario.",
    productCount: 15
  },
  {
    id: "custom",
    name: "Diseños Personalizados",
    image: "https://images.unsplash.com/photo-1633899306328-c5e70574afd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Creaciones a medida según tus preferencias.",
    productCount: 8
  },
  {
    id: "jewelry",
    name: "Joyería",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Diseños únicos para usar como accesorios.",
    productCount: 1222
  },
  {
    id: "toys",
    name: "Juguetes",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Artículos divertidos y educativos para niños de todas las edades.",
    productCount: 201
  }
];

const CategoriesPage = () => {
  return (
    <div className="container py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem active>Categorías</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <h1 className="text-3xl font-bold mt-6 mb-8">Categorías de Productos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            to={`/categories/${category.id}`}
            key={category.id}
            className="category-card h-full"
          >
            <Card className="overflow-hidden h-full border">
              <div className="aspect-video overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-3">{category.description}</p>
                <p className="text-sm font-medium text-primary">{category.productCount} Productos</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
