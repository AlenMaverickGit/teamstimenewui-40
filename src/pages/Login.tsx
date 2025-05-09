
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Eye, EyeOff, LockKeyhole, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Login: React.FC = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      // As requested, no actual validation, just simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Always store a dummy token and redirect
      localStorage.setItem("access_token", "dummy_token");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 left-4 md:left-auto bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 flex items-center shadow-lg animate-fade-in z-50 max-w-md">
          <div className="flex items-center">
            <div className="mr-2 bg-green-100 rounded-full p-1">
              <Check size={18} className="text-green-600" />
            </div>
            <p>Account created successfully! Please sign in.</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        {/* Logo and App Name */}
        <div className="mb-8 flex items-center justify-center">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg mr-3">
            <span className="text-white font-bold text-xl">TT</span>
          </div>
          <h1 className="text-foreground text-3xl md:text-4xl font-bold">
            <span className="text-primary">Teams</span>Time
          </h1>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="employeeId">
                  Employee ID
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">
                    <User size={18} />
                  </span>
                  <Input
                    id="employeeId"
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="EMP202301"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">
                    <LockKeyhole size={18} />
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={toggleShowPassword} 
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
              <Button
                type="submit"
                className="w-full py-5 text-base font-medium shadow-sm"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <a 
                  href="/register" 
                  className="text-primary font-medium hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/register");
                  }}
                >
                  Create Account
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-xs text-center text-muted-foreground mt-8">
          © 2025 TeamsTime. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
