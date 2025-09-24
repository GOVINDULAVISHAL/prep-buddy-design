import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export function Navbar({ onLoginClick, onSignupClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="SafeLearn" className="h-10 w-10" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SafeLearn
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-all duration-200 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full">
              Home
            </a>
            <Button 
              variant="ghost" 
              onClick={onLoginClick}
              className="text-foreground hover:text-primary hover:bg-primary/10 font-medium transition-all duration-200 focus-ring"
            >
              Login
            </Button>
            <Button 
              onClick={onSignupClick}
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary font-medium transition-all duration-200 focus-ring"
              style={{ boxShadow: 'var(--shadow-md)' }}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium px-2 py-1">
                Home
              </a>
              <Button 
                variant="ghost" 
                onClick={onLoginClick}
                className="text-foreground hover:text-primary hover:bg-primary/10 justify-start"
              >
                Login
              </Button>
              <Button 
                onClick={onSignupClick}
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-md"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}