import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Lock, Chrome } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface LoginFormProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export function LoginForm({ onClose, onSwitchToSignup }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetLoading, setIsResetLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    try {
      loginSchema.parse({ email, password });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.issues.forEach((err) => {
          if (err.path[0] === 'email') fieldErrors.email = err.message;
          if (err.path[0] === 'password') fieldErrors.password = err.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);
    
    if (!error) {
      onClose();
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const { error } = await signInWithGoogle();
    setIsGoogleLoading(false);
    
    if (!error) {
      onClose();
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail || !resetEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/auth?reset=true`,
    });
    setIsResetLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Check your email",
        description: "We've sent you a password reset link",
      });
      setShowResetDialog(false);
      setResetEmail("");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-card">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
        <p className="text-muted-foreground">Sign in to continue your safety journey</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-border bg-background"
                required
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-border bg-background"
                required
              />
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-md"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full border-border hover:bg-muted"
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
        >
          <Chrome className="mr-2 h-4 w-4" />
          {isGoogleLoading ? "Connecting..." : "Sign in with Google"}
        </Button>

        <div className="text-center space-y-2">
          <Button 
            variant="link" 
            className="text-sm text-muted-foreground hover:text-primary"
            type="button"
            onClick={() => setShowResetDialog(true)}
          >
            Forgot your password?
          </Button>
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button 
              variant="link" 
              className="text-primary hover:text-primary-dark p-0 font-semibold"
              onClick={onSwitchToSignup}
              type="button"
            >
              Sign up
            </Button>
          </div>
        </div>
      </CardContent>

      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="text-foreground">Reset Password</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter your email and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="your@email.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="pl-10 border-border bg-background"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowResetDialog(false)}
                className="flex-1 border-border"
                type="button"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePasswordReset}
                disabled={isResetLoading}
                className="flex-1 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary"
                type="button"
              >
                {isResetLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}