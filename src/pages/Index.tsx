import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, Users, Award, ArrowRight, Sparkles, TrendingUp, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/hero-illustration.png";

const Index = () => {
  const { user, loading } = useAuth();

  // Redirect authenticated users to dashboard
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-tertiary/5">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-primary"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex flex-col">
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      
      {/* Hero Section */}
      <main className="flex-1">
        <div className="relative py-20 lg:py-28 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-tertiary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left side - Hero content */}
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Smart Safety Learning Platform</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                    <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                      RAKSHA
                    </span>
                  </h1>
                  
                  <p className="text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
                    Master disaster preparedness through interactive learning, gamified challenges, and expert guidance.
                  </p>
                </div>

                {/* Feature highlights - Colorful Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="group bg-gradient-to-br from-primary to-primary-light p-6 rounded-2xl shadow-lg hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1">
                    <BookOpen className="h-7 w-7 text-white mb-3" />
                    <span className="text-sm font-semibold text-white block">Interactive Modules</span>
                  </div>
                  <div className="group bg-gradient-to-br from-tertiary to-tertiary-light p-6 rounded-2xl shadow-lg hover:shadow-glow-tertiary transition-all duration-300 hover:-translate-y-1">
                    <Shield className="h-7 w-7 text-white mb-3" />
                    <span className="text-sm font-semibold text-white block">Safety Certified</span>
                  </div>
                  <div className="group bg-gradient-to-br from-secondary to-secondary-light p-6 rounded-2xl shadow-lg hover:shadow-glow-secondary transition-all duration-300 hover:-translate-y-1">
                    <Users className="h-7 w-7 text-white mb-3" />
                    <span className="text-sm font-semibold text-white block">Community Learning</span>
                  </div>
                  <div className="group bg-gradient-to-br from-accent to-accent-light p-6 rounded-2xl shadow-lg hover:shadow-glow-accent transition-all duration-300 hover:-translate-y-1">
                    <Award className="h-7 w-7 text-white mb-3" />
                    <span className="text-sm font-semibold text-white block">Achievement System</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    onClick={handleSignupClick}
                    className="flex-1 h-12 text-base font-bold bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent shadow-glow-accent hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleLoginClick}
                    variant="outline"
                    className="flex-1 h-12 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </div>
              </div>

              {/* Right side - Hero Illustration */}
              <div className="relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-tertiary rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                  <img 
                    src={heroImage} 
                    alt="Students learning disaster preparedness with safety symbols and achievement badges"
                    className="relative rounded-3xl shadow-2xl w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card Section */}
        <div className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-tertiary"></div>
              <div className="relative p-12 md:p-16 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Ready to Begin?
                </h2>
                <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of students learning essential safety skills
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-md mx-auto">
                  <Button 
                    onClick={handleSignupClick}
                    className="h-12 text-base font-bold bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Create Account
                  </Button>
                  <Button 
                    onClick={handleLoginClick}
                    variant="outline"
                    className="h-12 text-base font-semibold border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                Making Safety Education Accessible
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                Join our growing community of prepared students and educators building safer communities together.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Stat Card 1 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-white p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-2">
                  <TrendingUp className="h-8 w-8 text-primary mb-4" />
                  <div className="text-5xl font-bold bg-gradient-to-br from-primary to-primary-dark bg-clip-text text-transparent mb-3">50K+</div>
                  <div className="text-foreground/70 font-semibold">Students Trained</div>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-tertiary to-tertiary-light rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-white p-8 rounded-3xl border-2 border-tertiary/20 hover:border-tertiary/40 shadow-lg hover:shadow-glow-tertiary transition-all duration-300 hover:-translate-y-2">
                  <Award className="h-8 w-8 text-tertiary mb-4" />
                  <div className="text-5xl font-bold bg-gradient-to-br from-tertiary to-tertiary-dark bg-clip-text text-transparent mb-3">95%</div>
                  <div className="text-foreground/70 font-semibold">Course Completion</div>
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-light rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-white p-8 rounded-3xl border-2 border-accent/20 hover:border-accent/40 shadow-lg hover:shadow-glow-accent transition-all duration-300 hover:-translate-y-2">
                  <Sparkles className="h-8 w-8 text-accent mb-4" />
                  <div className="text-5xl font-bold bg-gradient-to-br from-accent to-accent-dark bg-clip-text text-transparent mb-3">4.9★</div>
                  <div className="text-foreground/70 font-semibold">Student Rating</div>
                </div>
              </div>

              {/* Stat Card 4 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary-light rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-white p-8 rounded-3xl border-2 border-secondary/20 hover:border-secondary/40 shadow-lg hover:shadow-glow-secondary transition-all duration-300 hover:-translate-y-2">
                  <Clock className="h-8 w-8 text-secondary mb-4" />
                  <div className="text-5xl font-bold bg-gradient-to-br from-secondary to-secondary-dark bg-clip-text text-transparent mb-3">24/7</div>
                  <div className="text-foreground/70 font-semibold">Available Learning</div>
                </div>
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
