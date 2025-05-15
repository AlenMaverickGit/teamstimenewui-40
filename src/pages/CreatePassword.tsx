
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="min-h-screen bg-gradient-to-br from-[#3498DB] via-[#2980B9] to-[#1F618D] flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-6 drop-shadow-md">
        Create <span className="text-white/90 font-extrabold">Password</span>
      </h1>

      <div className="w-full max-w-md">
        <Card className="backdrop-blur-md bg-white/90 border-0 shadow-xl rounded-2xl transition-all duration-300">
          <div className="h-1 bg-[#3498DB]"></div>
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Set Your Password</h2>
              <p className="text-muted-foreground">
                Create a secure password for your account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="h-11 bg-white/50 border border-gray-200 focus-visible:border-[#3498DB] focus-visible:ring-1 focus-visible:ring-[#3498DB] shadow-sm pr-10"
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      }
                    })}
                    placeholder="Create a secure password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
                
                <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs font-medium text-gray-700 mb-2">Password requirements:</div>
                  <ul className="space-y-1 pl-1">
                    <PasswordRequirement met={hasMinLength} text="At least 8 characters" />
                    <PasswordRequirement met={hasUppercase} text="One uppercase letter" />
                    <PasswordRequirement met={hasLowercase} text="One lowercase letter" />
                    <PasswordRequirement met={hasNumber} text="One number" />
                    <PasswordRequirement met={hasSpecialChar} text="One special character" />
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="h-11 bg-white/50 border border-gray-200 focus-visible:border-[#3498DB] focus-visible:ring-1 focus-visible:ring-[#3498DB] shadow-sm pr-10"
                    {...register("confirmPassword", { 
                      required: "Please confirm your password",
                      validate: value => value === password || "Passwords do not match"
                    })}
                    placeholder="Confirm your password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
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
                className="w-full h-11 bg-[#3498DB] hover:bg-[#2980B9] shadow-md text-white font-medium"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface PasswordRequirementProps {
  met: boolean;
  text: string;
}

const PasswordRequirement: React.FC<PasswordRequirementProps> = ({ met, text }) => (
  <li className="flex items-center gap-1.5 text-xs">
    <span className={`flex items-center justify-center w-4 h-4 rounded-full transition-colors ${
      met ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-400"
    }`}>
      {met ? <Check size={10} /> : ""}
    </span>
    <span className={met ? "text-gray-700 font-medium" : "text-gray-500"}>
      {text}
    </span>
  </li>
);

export default CreatePassword;
