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
        <div className="relative gradient-animated py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-secondary/20 to-accent/30 opacity-40"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                  <div className="flex items-center space-x-3 backdrop-blur-sm bg-gradient-to-br from-primary/20 to-primary/5 p-4 rounded-xl border-2 border-primary/30 hover:border-primary/50 transition-all hover:scale-105 shadow-lg card-glow">
                    <BookOpen className="h-6 w-6 text-primary animate-pulse" />
                    <span className="text-sm font-medium text-foreground">Interactive Modules</span>
                  </div>
                  <div className="flex items-center space-x-3 backdrop-blur-sm bg-gradient-to-br from-secondary/20 to-secondary/5 p-4 rounded-xl border-2 border-secondary/30 hover:border-secondary/50 transition-all hover:scale-105 shadow-lg card-glow-secondary">
                    <Shield className="h-6 w-6 text-secondary animate-pulse" />
                    <span className="text-sm font-medium text-foreground">Safety Certified</span>
                  </div>
                  <div className="flex items-center space-x-3 backdrop-blur-sm bg-gradient-to-br from-accent/20 to-accent/5 p-4 rounded-xl border-2 border-accent/30 hover:border-accent/50 transition-all hover:scale-105 shadow-lg card-glow-accent">
                    <Users className="h-6 w-6 text-accent animate-pulse" />
                    <span className="text-sm font-medium text-foreground">Community Learning</span>
                  </div>
                  <div className="flex items-center space-x-3 backdrop-blur-sm bg-gradient-to-br from-tertiary/20 to-tertiary/5 p-4 rounded-xl border-2 border-tertiary/30 hover:border-tertiary/50 transition-all hover:scale-105 shadow-lg">
                    <Award className="h-6 w-6 text-tertiary animate-pulse" />
                    <span className="text-sm font-medium text-foreground">Achievement System</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleSignupClick}
                    variant="gradient"
                    className="flex-1 font-semibold py-6 text-lg animate-pulse-glow"
                  >
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    onClick={handleLoginClick}
                    variant="outline"
                    className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium py-6 text-lg backdrop-blur-sm bg-background/50"
                  >
                    Sign In
                  </Button>
                </div>
              </div>

              {/* Right side - CTA Card */}
              <div className="flex justify-center lg:justify-end">
                <div className="text-center space-y-6 backdrop-blur-md bg-gradient-to-br from-card/90 to-card/70 p-10 rounded-3xl border-2 border-primary/30 shadow-2xl card-glow-accent hover:scale-105 transition-all">
                  <h3 className="text-3xl font-bold text-gradient">Ready to Begin?</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Join thousands of students learning essential safety skills
                  </p>
                  <div className="space-y-4">
                    <Button 
                      onClick={handleSignupClick}
                      variant="forest"
                      className="w-full font-semibold py-6 text-lg"
                    >
                      Create Account
                    </Button>
                    <Button 
                      onClick={handleLoginClick}
                      variant="outline"
                      className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-6 text-lg backdrop-blur-sm"
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
        <div className="py-16 bg-gradient-to-br from-card via-background to-card relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-accent/10 opacity-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-rainbow mb-4">Making Safety Education Accessible</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Join our growing community of prepared students and educators building safer communities together.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center backdrop-blur-sm bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all hover:scale-105 card-glow">
                <div className="text-5xl font-bold text-primary mb-2 animate-pulse">50K+</div>
                <div className="text-muted-foreground font-medium">Students Trained</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-gradient-to-br from-secondary/10 to-secondary/5 p-6 rounded-2xl border-2 border-secondary/20 hover:border-secondary/40 transition-all hover:scale-105 card-glow-secondary">
                <div className="text-5xl font-bold text-secondary mb-2 animate-pulse">95%</div>
                <div className="text-muted-foreground font-medium">Course Completion</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-2xl border-2 border-accent/20 hover:border-accent/40 transition-all hover:scale-105 card-glow-accent">
                <div className="text-5xl font-bold text-accent mb-2 animate-pulse">4.9★</div>
                <div className="text-muted-foreground font-medium">Student Rating</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-gradient-to-br from-tertiary/10 to-tertiary/5 p-6 rounded-2xl border-2 border-tertiary/20 hover:border-tertiary/40 transition-all hover:scale-105">
                <div className="text-5xl font-bold text-tertiary mb-2 animate-pulse">24/7</div>
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