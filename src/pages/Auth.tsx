import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { useAuth } from "@/hooks/useAuth";

export default function Auth() {
  const [showSignup, setShowSignup] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('mode') === 'signup';
  });
  const { user, loading } = useAuth();

  // Redirect authenticated users to dashboard
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-animated p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-secondary/20 to-accent/20 opacity-50"></div>
      {/* Back to Home Button */}
      <Link to="/" className="absolute top-6 left-6 z-10">
        <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:text-primary backdrop-blur-sm bg-background/50 hover:bg-background/80 transition-all shadow-md">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      
      <div className="w-full max-w-md relative z-10 backdrop-blur-sm bg-background/80 p-8 rounded-3xl border-2 border-primary/20 shadow-2xl">
        {showSignup ? (
          <SignupForm
            onClose={() => setShowSignup(false)}
            onSwitchToLogin={() => setShowSignup(false)}
          />
        ) : (
          <LoginForm
            onClose={() => setShowSignup(false)}
            onSwitchToSignup={() => setShowSignup(true)}
          />
        )}
      </div>
    </div>
  );
}