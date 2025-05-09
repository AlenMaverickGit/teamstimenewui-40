
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5D2EFF] via-[#6B2BEB] to-[#814BFE] flex flex-col items-center justify-center px-4 py-8">
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

      {/* Welcome Message */}
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg">
        Welcome to <span className="text-yellow-300">TeamsTime</span>
      </h1>

      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 transition-all duration-300 transform hover:shadow-[0_20px_50px_rgba(93,46,255,0.2)] animate-fade-in">
        <div className="text-center mb-6">
          <p className="text-lg text-gray-600 font-medium">
            Please login to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee ID
            </label>
            <Input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="EMP202301"
              className="w-full px-4 py-2 transition-all duration-200 focus:ring-2 focus:ring-primary/20 border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 transition-all duration-200 focus:ring-2 focus:ring-primary/20 border-gray-300"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-[#5D2EFF] to-[#814BFE] hover:shadow-lg hover:shadow-primary/25 transition-all duration-200"
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
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a 
              href="/register" 
              className="text-indigo-600 hover:underline transition-all"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Sign Up
            </a>
          </p>
        </div>

        <p className="text-xs text-center text-gray-400 mt-6">
          Powered by{" "}
          <span className="text-indigo-600 font-semibold">TeamsTime</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
