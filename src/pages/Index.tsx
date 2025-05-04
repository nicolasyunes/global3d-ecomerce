
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <CategorySection />
      <FeaturedProducts />
    </div>
  );
};

export default Index;
