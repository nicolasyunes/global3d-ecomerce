
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-shop-light-gray py-12 md:py-24">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            3D Printed Creations<br />
            <span className="text-primary">For Your World</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Discover unique and customizable 3D printed products that inspire creativity and innovation.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/shop">
                Shop Now <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/categories">
                Browse Categories
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative h-64 md:h-auto">
          <img 
            src="https://images.unsplash.com/photo-1612557066432-65d42da5f5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="3D Printed Products" 
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
