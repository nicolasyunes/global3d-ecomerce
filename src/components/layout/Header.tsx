
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Search,
  Menu,
  X
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import UserMenu from "@/components/auth/UserMenu";
import { useCart } from "@/components/cart/CartContext";

const Header = () => {
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  
  const menuItems = [
    { name: "Inicio", link: "/" },
    { name: "Tienda", link: "/shop" },
    { name: "Categorías", link: "/categories" },
    { name: "Nosotros", link: "/about" },
    { name: "Contacto", link: "/contact" },
  ];
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border py-2">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-primary">
          Global3D
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link 
                    to={item.link}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}
        
        {/* Search bar (shown conditionally) */}
        {searchOpen && !isMobile && (
          <div className="absolute left-0 top-0 w-full h-full bg-white flex items-center px-4 animate-fade-in">
            <div className="flex w-full items-center max-w-md mx-auto">
              <Input
                placeholder="Buscar productos..."
                className="flex-1"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => setSearchOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Buscar"
          >
            <Search size={20} />
          </Button>
          
          {/* Usuario (ahora usa el componente UserMenu) */}
          <UserMenu />
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Carrito">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          
          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 mt-8">
                  {menuItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        to={item.link}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
