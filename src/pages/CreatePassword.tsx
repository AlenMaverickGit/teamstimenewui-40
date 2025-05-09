
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Check, X, LockKeyhole } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2A2F3C] to-[#3A3F4C] flex flex-col items-center justify-center px-4 py-8">
      {/* Logo and App Name */}
      <div className="mb-8 flex items-center">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-xl mr-3">
          <span className="text-white font-bold text-xl">TT</span>
        </div>
        <h1 className="text-white text-3xl md:text-4xl font-bold">
          <span className="text-primary">Teams</span>Time
        </h1>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create Password</CardTitle>
          <CardDescription className="text-center">
            Set a secure password for your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">
                  <LockKeyhole size={18} />
                </span>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  {...register("password", { 
                    required: "Password is required",
                  })}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
              
              <div className="mt-3 p-4 bg-muted/10 rounded-lg border border-border/50">
                <div className="text-xs font-medium mb-2">Password requirements:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <PasswordRequirement met={hasMinLength}>
                    At least 8 characters
                  </PasswordRequirement>
                  <PasswordRequirement met={hasUppercase}>
                    One uppercase letter
                  </PasswordRequirement>
                  <PasswordRequirement met={hasLowercase}>
                    One lowercase letter
                  </PasswordRequirement>
                  <PasswordRequirement met={hasNumber}>
                    One number
                  </PasswordRequirement>
                  <PasswordRequirement met={hasSpecialChar}>
                    One special character
                  </PasswordRequirement>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">
                  <LockKeyhole size={18} />
                </span>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button 
              type="submit" 
              className="w-full py-2 bg-primary hover:bg-primary/90"
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
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

interface PasswordRequirementProps {
  met: boolean;
  children: React.ReactNode;
}

const PasswordRequirement: React.FC<PasswordRequirementProps> = ({ met, children }) => (
  <li className="flex items-center gap-1.5">
    {met ? (
      <Check size={14} className="text-green-500" />
    ) : (
      <X size={14} className="text-muted-foreground" />
    )}
    <span className={met ? "text-green-600 dark:text-green-400" : ""}>
      {children}
    </span>
  </li>
);

export default CreatePassword;
