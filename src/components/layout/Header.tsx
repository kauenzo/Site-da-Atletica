import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Calendário", href: "/calendario" },
  { label: "Galeria", href: "/galeria" },
  { label: "Apoiador", href: "/apoiador" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isScrolled) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-atletica-burgundy/95 backdrop-blur-sm border-b border-atletica-white/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-atletica-white hover:text-atletica-sand-light transition-colors duration-200 font-medium",
                  location.pathname === item.href && "text-atletica-sand-light"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link to="/" className="flex items-center justify-center">
            <div className="w-10 h-10 bg-atletica-white rounded-full shadow-md flex items-center justify-center">
              <span className="text-atletica-red font-bold text-sm">LOGO</span>
            </div>
          </Link>

          {/* Right Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.slice(2).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-atletica-white hover:text-atletica-sand-light transition-colors duration-200 font-medium",
                  location.pathname === item.href && "text-atletica-sand-light"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <select
              value={location.pathname}
              onChange={(e) => window.location.href = e.target.value}
              className="bg-atletica-burgundy text-atletica-white border border-atletica-white/20 rounded px-2 py-1 text-sm"
            >
              {navItems.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};