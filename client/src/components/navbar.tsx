import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { FileText, Menu, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function AuthButtons() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const name = localStorage.getItem('userName') || 'User';
    setIsAuthenticated(!!authStatus);
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-3">
        <Link href="/dashboard">
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-4 py-2 rounded-lg font-medium transform hover:scale-105 transition-all duration-200">
            <User className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </Link>
        <Button 
          onClick={handleLogout}
          variant="outline" 
          className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-4 py-2 rounded-lg font-medium transform hover:scale-105 transition-all duration-200"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex space-x-3">
      <Link href="/auth/login">
        <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-4 py-2 rounded-lg font-medium transform hover:scale-105 transition-all duration-200">
          Login
        </Button>
      </Link>
      <Link href="/auth/signup">
        <Button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-bold transform hover:scale-105 transition-all duration-200">
          Sign Up
        </Button>
      </Link>
    </div>
  );
}

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Templates", href: "/templates" },
    { name: "Tips", href: "/tips" },
    { name: "Pricing", href: "/pricing" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
            <FileText className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">ResumeBuilder Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all duration-200 hover:text-yellow-300 hover:scale-105 ${
                  location === item.href ? "text-yellow-300" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button className="btn-primary mt-4">Get Started</Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}