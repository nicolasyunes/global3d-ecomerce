
import { Link } from "react-router-dom";

// Define types for our categories
interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "figurines",
    name: "Figuras",
    image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Personajes coleccionables y modelos detallados"
  },
  {
    id: "home-decor",
    name: "Decoración",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Piezas únicas para tu hogar"
  },
  {
    id: "gadgets",
    name: "Accesorios",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Herramientas útiles y accesorios"
  },
  {
    id: "custom",
    name: "Diseños Personalizados",
    image: "https://images.unsplash.com/photo-1633899306328-c5e70574afd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Creaciones a tu medida"
  }
];

const CategorySection = () => {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Comprar por Categoría</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              to={`/categories/${category.id}`}
              key={category.id}
              className="category-card rounded-lg overflow-hidden bg-white border group"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
