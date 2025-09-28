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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      {/* Back to Home Button */}
      <Link to="/" className="absolute top-6 left-6">
        <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      
      <div className="w-full max-w-md">
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