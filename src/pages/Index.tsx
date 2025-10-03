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
    window.location.href = '/auth?mode=signup';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      
      {/* Hero Section */}
      <main className="flex-1">
        <div className="relative py-24 overflow-hidden bg-gradient-to-br from-background via-secondary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Hero content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight text-foreground">
                    RAKSHA
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                    Master disaster preparedness through interactive learning, gamified challenges, and expert guidance.
                  </p>
                </div>

                {/* Feature highlights */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 bg-card p-5 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-md">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-card-foreground">Interactive Modules</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-card p-5 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-md">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-card-foreground">Safety Certified</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-card p-5 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-md">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-card-foreground">Community Learning</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-card p-5 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-md">
                    <Award className="h-5 w-5 text-tertiary" />
                    <span className="text-sm font-medium text-card-foreground">Achievement System</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    onClick={handleSignupClick}
                    className="flex-1 h-12 text-base font-semibold"
                  >
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleLoginClick}
                    variant="outline"
                    className="flex-1 h-12 text-base font-medium"
                  >
                    Sign In
                  </Button>
                </div>
              </div>

              {/* Right side - CTA Card */}
              <div className="flex justify-center lg:justify-end">
                <div className="text-center space-y-6 bg-card p-12 rounded-2xl border border-border shadow-lg max-w-md w-full">
                  <h3 className="text-3xl font-bold text-foreground">Ready to Begin?</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Join thousands of students learning essential safety skills
                  </p>
                  <div className="space-y-3 pt-2">
                    <Button 
                      onClick={handleSignupClick}
                      className="w-full h-12 text-base font-semibold"
                    >
                      Create Account
                    </Button>
                    <Button 
                      onClick={handleLoginClick}
                      variant="outline"
                      className="w-full h-12 text-base font-medium"
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
        <div className="py-20 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Making Safety Education Accessible</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Join our growing community of prepared students and educators building safer communities together.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-all">
                <div className="text-5xl font-bold text-primary mb-3">50K+</div>
                <div className="text-muted-foreground font-medium">Students Trained</div>
              </div>
              <div className="text-center bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-all">
                <div className="text-5xl font-bold text-primary mb-3">95%</div>
                <div className="text-muted-foreground font-medium">Course Completion</div>
              </div>
              <div className="text-center bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-all">
                <div className="text-5xl font-bold text-primary mb-3">4.9★</div>
                <div className="text-muted-foreground font-medium">Student Rating</div>
              </div>
              <div className="text-center bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-all">
                <div className="text-5xl font-bold text-tertiary mb-3">24/7</div>
                <div className="text-muted-foreground font-medium">Available Learning</div>
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