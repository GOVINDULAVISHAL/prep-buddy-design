import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, Users, Award, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

const Index = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
    setShowLoginForm(false);
  };

  const closeForms = () => {
    setShowLoginForm(false);
    setShowSignupForm(false);
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
                    Learn.{" "}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Prepare.
                    </span>{" "}
                    <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                      Stay Safe.
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-lg">
                    Master disaster preparedness through interactive learning, earn badges, and build life-saving skills 
                    in a fun, gamified environment.
                  </p>
                </div>

                {/* Feature highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-card rounded-lg shadow-sm border border-border">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Interactive Learning</h3>
                      <p className="text-sm text-muted-foreground">Engaging modules & quizzes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-card rounded-lg shadow-sm border border-border">
                    <Award className="h-8 w-8 text-secondary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Earn Badges</h3>
                      <p className="text-sm text-muted-foreground">Track your progress</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-card rounded-lg shadow-sm border border-border">
                    <Users className="h-8 w-8 text-accent" />
                    <div>
                      <h3 className="font-semibold text-foreground">Compete & Learn</h3>
                      <p className="text-sm text-muted-foreground">Join the leaderboard</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-card rounded-lg shadow-sm border border-border">
                    <Shield className="h-8 w-8 text-warning" />
                    <div>
                      <h3 className="font-semibold text-foreground">Life-Saving Skills</h3>
                      <p className="text-sm text-muted-foreground">Real-world preparedness</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleSignupClick}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-lg text-lg px-8"
                  >
                    Start Learning Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    onClick={handleLoginClick}
                    variant="outline" 
                    size="lg"
                    className="border-primary text-primary hover:bg-primary hover:text-white text-lg px-8"
                  >
                    Sign In
                  </Button>
                </div>
              </div>

              {/* Right side - Logo and form */}
              <div className="flex flex-col items-center space-y-8">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
                  <img 
                    src={logo} 
                    alt="SafeLearn" 
                    className="relative h-32 w-32 md:h-48 md:w-48 drop-shadow-2xl"
                  />
                </div>

                {/* Auth Forms */}
                {showLoginForm && (
                  <LoginForm 
                    onClose={closeForms} 
                    onSwitchToSignup={() => {
                      setShowLoginForm(false);
                      setShowSignupForm(true);
                    }}
                  />
                )}

                {showSignupForm && (
                  <SignupForm 
                    onClose={closeForms} 
                    onSwitchToLogin={() => {
                      setShowSignupForm(false);
                      setShowLoginForm(true);
                    }}
                  />
                )}

                {!showLoginForm && !showSignupForm && (
                  <div className="text-center space-y-4 bg-card p-8 rounded-xl shadow-lg border border-border">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Begin?</h3>
                    <p className="text-muted-foreground mb-6">
                      Join thousands of students learning essential safety skills
                    </p>
                    <div className="space-y-3">
                      <Button 
                        onClick={handleSignupClick}
                        className="w-full bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary shadow-md"
                      >
                        Create Account
                      </Button>
                      <Button 
                        onClick={handleLoginClick}
                        variant="outline"
                        className="w-full border-border hover:bg-muted"
                      >
                        Sign In
                      </Button>
                    </div>
                  </div>
                )}
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
