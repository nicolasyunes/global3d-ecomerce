
import { useState } from "react";
import { useParams } from "react-router-dom";
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

// Sample product data - in a real app, this would come from an API
const products = [
  {
    id: "1",
    name: "Dragon Figurine",
    price: 29.99,
    description: "A detailed dragon figurine, perfect for collectors and fantasy enthusiasts. Hand-painted with intricate details.",
    features: [
      "High-quality PLA material",
      "Hand-painted finish",
      "Dimensions: 15cm x 10cm x 20cm",
      "Weight: 250g"
    ],
    specifications: [
      { name: "Material", value: "PLA Plastic" },
      { name: "Height", value: "15cm" },
      { name: "Width", value: "10cm" },
      { name: "Depth", value: "20cm" },
      { name: "Weight", value: "250g" },
      { name: "Print Time", value: "18 hours" }
    ],
    images: [
      "https://images.unsplash.com/photo-1599689018034-48e2ead82951?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    category: "figurines",
    inStock: true
  },
  {
    id: "2",
    name: "Geometric Vase",
    price: 24.99,
    description: "Modern geometric vase designed to hold small plants or flowers. Adds a contemporary touch to any room.",
    features: [
      "Unique geometric design",
      "Watertight construction",
      "Multiple color options",
      "Dimensions: 12cm x 12cm x 18cm"
    ],
    specifications: [
      { name: "Material", value: "PETG Plastic" },
      { name: "Height", value: "18cm" },
      { name: "Width", value: "12cm" },
      { name: "Depth", value: "12cm" },
      { name: "Weight", value: "180g" },
      { name: "Print Time", value: "14 hours" }
    ],
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    category: "home-decor",
    inStock: true
  }
];

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <a href="/shop">Continue Shopping</a>
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

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
        <div>
          <div className="rounded-lg overflow-hidden border">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Features:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
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
            
            <Button onClick={handleAddToCart} className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In stock' : 'Out of stock'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-6 border rounded-md mt-2">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <h3>Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="p-6 border rounded-md mt-2">
            <div className="divide-y">
              {product.specifications.map((spec, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 py-3">
                  <div className="font-medium">{spec.name}</div>
                  <div className="md:col-span-2 text-muted-foreground">{spec.value}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="p-6 border rounded-md mt-2">
            <div className="prose max-w-none">
              <h3>Shipping Information</h3>
              <p>We ship our 3D printed products worldwide using trusted delivery services.</p>
              <ul>
                <li>Standard shipping: 5-7 business days</li>
                <li>Express shipping: 2-3 business days</li>
                <li>Free shipping on orders over $50</li>
              </ul>
              <p>All products are carefully packaged to ensure they arrive safely.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductPage;
