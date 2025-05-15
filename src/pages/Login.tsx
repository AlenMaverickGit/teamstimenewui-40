
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, LogIn, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user was redirected from successful registration
    if (location.state?.registrationSuccess) {
      setShowSuccessMessage(true);
      
      toast({
        title: "Account created successfully!",
        description: "You can now login with your credentials.",
        duration: 5000
      });
      
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location, toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // As requested, always navigate to dashboard without actual validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem("access_token", "dummy_token");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a4d7c] via-[#2980B9] to-[#3498DB] flex flex-col items-center justify-center px-4 py-8">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 left-4 md:left-auto md:right-4 md:top-4 bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 flex items-center justify-between shadow-lg animate-fade-in z-50 max-w-md">
          <div className="flex items-center">
            <div className="mr-2 bg-green-100 rounded-full p-1">
              <Check size={18} className="text-green-600" />
            </div>
            <p>Account created successfully! Please sign in.</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md text-center mb-8">
        {/* App Logo */}
        <div className="mx-auto w-20 h-20 mb-6 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center">
            <Clock className="h-8 w-8 text-[#3498DB]" />
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-white text-2xl font-semibold mb-2">
          Welcome to TeamsTime
        </h1>
        <p className="text-white/80 text-sm">
          Sign in to access your dashboard
        </p>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-xl overflow-hidden border border-white/20 p-1">
          <form onSubmit={handleLogin} className="space-y-4 p-4">
            <div className="space-y-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="bg-white/10 border-white/10 text-white placeholder:text-white/60 h-12"
                autoComplete="email"
              />
              
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-white/10 border-white/10 text-white placeholder:text-white/60 h-12"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember-me" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  className="data-[state=checked]:bg-white data-[state=checked]:text-[#3498DB] border-white"
                />
                <Label htmlFor="remember-me" className="text-sm font-normal text-white">
                  Remember me
                </Label>
              </div>
              
              <a 
                href="#" 
                className="text-sm text-white hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle forgot password
                }}
              >
                Forgot Password
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-white hover:bg-white/90 text-[#3498DB] font-medium shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="w-4 h-4 border-2 border-[#3498DB] border-t-transparent rounded-full animate-spin mr-2"></span>
                  Signing In...
                </span>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="border-t border-white/20 flex-grow"></div>
          <span className="px-4 text-white/60 text-sm">or</span>
          <div className="border-t border-white/20 flex-grow"></div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-white/80">
            Don't have an account?{" "}
            <a 
              href="/register" 
              className="text-white hover:underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
