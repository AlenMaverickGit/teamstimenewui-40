
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type PasswordFormData = {
  password: string;
  confirmPassword: string;
};

const CreatePassword: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<PasswordFormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange" // Validate on change for a better UX
  });

  const password = watch("password");

  // Check password criteria
  const hasMinLength = password?.length >= 8;
  const hasUppercase = /[A-Z]/.test(password || "");
  const hasLowercase = /[a-z]/.test(password || "");
  const hasNumber = /\d/.test(password || "");
  const hasSpecialChar = /[@$!%*?&]/.test(password || "");

  const onSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    try {
      // Here would be the API call to set the password
      console.log("Setting password for user");
      
      // Get registration data
      const registrationData = JSON.parse(sessionStorage.getItem("registrationData") || "{}");
      
      // Combine registration data with password
      const userData = {
        ...registrationData,
        password: data.password,
      };
      
      console.log("Complete user data:", userData);
      
      // Clear registration data from session storage
      sessionStorage.removeItem("registrationData");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Account created successfully!",
        description: "You can now login with your credentials.",
        duration: 5000
      });
      
      // Navigate to login page
      navigate("/", { state: { registrationSuccess: true } });
    } catch (error) {
      console.error("Password creation error:", error);
      toast({
        title: "Error creating account",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5D2EFF] via-[#6B2BEB] to-[#814BFE] flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg">
        Create <span className="text-yellow-300">Password</span>
      </h1>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 transition-all duration-300 transform hover:shadow-[0_20px_50px_rgba(93,46,255,0.2)] animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Set Your Password</h2>
          <p className="text-sm text-gray-600 mt-1">
            Create a secure password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 border-gray-300"
                {...register("password", { 
                  required: "Password is required",
                })}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
            
            <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-xs font-medium text-gray-700 mb-2">Password requirements:</div>
              <ul className="text-xs text-gray-500 space-y-1 pl-4">
                <li className="flex items-center gap-1.5">
                  <span className={`${hasMinLength ? "text-green-500" : "text-gray-400"}`}>
                    {hasMinLength ? <Check size={12} className="inline" /> : "○"}
                  </span>
                  <span className={hasMinLength ? "text-green-600" : ""}>
                    At least 8 characters
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className={`${hasUppercase ? "text-green-500" : "text-gray-400"}`}>
                    {hasUppercase ? <Check size={12} className="inline" /> : "○"}
                  </span>
                  <span className={hasUppercase ? "text-green-600" : ""}>
                    One uppercase letter
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className={`${hasLowercase ? "text-green-500" : "text-gray-400"}`}>
                    {hasLowercase ? <Check size={12} className="inline" /> : "○"}
                  </span>
                  <span className={hasLowercase ? "text-green-600" : ""}>
                    One lowercase letter
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className={`${hasNumber ? "text-green-500" : "text-gray-400"}`}>
                    {hasNumber ? <Check size={12} className="inline" /> : "○"}
                  </span>
                  <span className={hasNumber ? "text-green-600" : ""}>
                    One number
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className={`${hasSpecialChar ? "text-green-500" : "text-gray-400"}`}>
                    {hasSpecialChar ? <Check size={12} className="inline" /> : "○"}
                  </span>
                  <span className={hasSpecialChar ? "text-green-600" : ""}>
                    One special character
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 border-gray-300"
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full py-2 mt-6 bg-gradient-to-r from-[#5D2EFF] to-[#814BFE] hover:shadow-lg hover:shadow-primary/25 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;
