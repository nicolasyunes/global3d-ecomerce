
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
    name: "Figurines",
    image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Collectible characters and detailed models for display.",
    productCount: 24
  },
  {
    id: "home-decor",
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Beautiful and functional items to enhance your living space.",
    productCount: 18
  },
  {
    id: "gadgets",
    name: "Gadgets",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Useful tools and accessories for everyday use.",
    productCount: 15
  },
  {
    id: "custom",
    name: "Custom Designs",
    image: "https://images.unsplash.com/photo-1633899306328-c5e70574afd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Personalized creations tailored to your preferences.",
    productCount: 8
  },
  {
    id: "jewelry",
    name: "Jewelry",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Unique wearable designs and accessories.",
    productCount: 12
  },
  {
    id: "toys",
    name: "Toys & Games",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Fun and educational items for children of all ages.",
    productCount: 20
  }
];

const CategoriesPage = () => {
  return (
    <div className="container py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem active>Categories</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <h1 className="text-3xl font-bold mt-6 mb-8">Product Categories</h1>
      
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
                <p className="text-sm font-medium text-primary">{category.productCount} Products</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
