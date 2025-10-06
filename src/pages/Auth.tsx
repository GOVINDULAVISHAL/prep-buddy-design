import { useState, useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export default function Auth() {
  const [showSignup, setShowSignup] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('mode') === 'signup';
  });
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isCheckingRecovery, setIsCheckingRecovery] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Check if this is a password reset redirect
  useEffect(() => {
    const checkForRecovery = async () => {
      setIsCheckingRecovery(true);
      
      // Supabase puts the recovery token in the URL hash
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const type = hashParams.get('type');
      
      if (type === 'recovery' && accessToken) {
        // The session should be automatically set by Supabase
        // Wait a moment for it to be established
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setShowResetPassword(true);
          // Clean up URL
          window.history.replaceState({}, document.title, '/auth');
        }
      }
      
      setIsCheckingRecovery(false);
    };
    
    checkForRecovery();
  }, []);

  // Show loading while checking for recovery session
  if (loading || isCheckingRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only redirect if not in password reset mode
  if (user && !showResetPassword) {
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
        {showResetPassword ? (
          <ResetPasswordForm
            onSuccess={() => {
              setShowResetPassword(false);
              setShowSignup(false);
              navigate('/auth');
            }}
          />
        ) : showSignup ? (
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