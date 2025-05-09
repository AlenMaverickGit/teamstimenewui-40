
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type PasswordFormData = {
  password: string;
  confirmPassword: string;
};

const CreatePassword: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<PasswordFormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  const password = watch("password");

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
      
      // Navigate to login page
      navigate("/", { state: { registrationSuccess: true } });
    } catch (error) {
      console.error("Password creation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5D2EFF] via-[#6B2BEB] to-[#814BFE] flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg">
        Create <span className="text-yellow-300">Password</span>
      </h1>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 transition-transform transform hover:scale-[1.01]">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Set Your Password</h2>
          <p className="text-sm text-gray-600 mt-1">
            Create a secure password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="pr-10"
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                  }
                })}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
            
            <div className="mt-2 space-y-1">
              <div className="text-xs text-gray-500">Password must contain:</div>
              <ul className="text-xs text-gray-500 space-y-1 pl-4">
                <li className={`${password?.length >= 8 ? "text-green-500" : ""}`}>
                  At least 8 characters
                </li>
                <li className={`${password?.match(/[A-Z]/) ? "text-green-500" : ""}`}>
                  One uppercase letter
                </li>
                <li className={`${password?.match(/[a-z]/) ? "text-green-500" : ""}`}>
                  One lowercase letter
                </li>
                <li className={`${password?.match(/\d/) ? "text-green-500" : ""}`}>
                  One number
                </li>
                <li className={`${password?.match(/[@$!%*?&]/) ? "text-green-500" : ""}`}>
                  One special character
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="pr-10"
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full py-2 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;
