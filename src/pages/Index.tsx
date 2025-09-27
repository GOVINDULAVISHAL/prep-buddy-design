import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, Users, Award, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const Index = () => {
  const { user, loading } = useAuth();

  // Redirect authenticated users to dashboard
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLoginClick = () => {
    window.location.href = '/auth';
  };

  const handleSignupClick = () => {
    window.location.href = '/auth';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      
      {/* Hero Section */}
      <main className="flex-1">
        <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Hero content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      RAKSHA
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-lg">
                    Master disaster preparedness through interactive learning, gamified challenges, and expert guidance.
                  </p>
                </div>

                {/* Feature highlights */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 bg-card/50 p-4 rounded-lg border border-border/30">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-foreground">Interactive Modules</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-card/50 p-4 rounded-lg border border-border/30">
                    <Shield className="h-6 w-6 text-secondary" />
                    <span className="text-sm font-medium text-foreground">Safety Certified</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-card/50 p-4 rounded-lg border border-border/30">
                    <Users className="h-6 w-6 text-accent" />
                    <span className="text-sm font-medium text-foreground">Community Learning</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-card/50 p-4 rounded-lg border border-border/30">
                    <Award className="h-6 w-6 text-warning" />
                    <span className="text-sm font-medium text-foreground">Achievement System</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleSignupClick}
                    className="flex-1 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground font-semibold py-3 transition-all duration-200"
                  >
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleLoginClick}
                    variant="outline"
                    className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium py-3 transition-all duration-200"
                  >
                    Sign In
                  </Button>
                </div>
              </div>

              {/* Right side - CTA Card */}
              <div className="flex justify-center lg:justify-end">
                <div className="text-center space-y-6 bg-card p-8 rounded-2xl border border-border/50 backdrop-blur-sm" style={{ boxShadow: 'var(--shadow-xl)' }}>
                  <h3 className="text-2xl font-bold text-foreground">Ready to Begin?</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Join thousands of students learning essential safety skills
                  </p>
                  <div className="space-y-4">
                    <Button 
                      onClick={handleSignupClick}
                      className="w-full bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary font-semibold py-3 transition-all duration-200 focus-ring"
                      style={{ boxShadow: 'var(--shadow-md)' }}
                    >
                      Create Account
                    </Button>
                    <Button 
                      onClick={handleLoginClick}
                      variant="outline"
                      className="w-full border-2 border-border hover:bg-muted font-medium py-3 transition-all duration-200 focus-ring"
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Making Safety Education Accessible</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join our growing community of prepared students and educators building safer communities together.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">95%</div>
                <div className="text-muted-foreground">Course Completion</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">4.9★</div>
                <div className="text-muted-foreground">Student Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-warning mb-2">24/7</div>
                <div className="text-muted-foreground">Available Learning</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;