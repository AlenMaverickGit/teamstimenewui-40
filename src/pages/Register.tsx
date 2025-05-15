
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, User } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

type RegistrationFormData = {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  dateOfBirth: string;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<RegistrationFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      dateOfBirth: "",
    }
  });

  const roles = [
    { id: 1, name: "Developer" },
    { id: 2, name: "Project Manager" },
    { id: 3, name: "Designer" },
    { id: 4, name: "Quality Assurance" },
    { id: 5, name: "Team Lead" },
  ];

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    try {
      // Here would be the API call to register user and send OTP
      console.log("Registration data:", data);
      
      // Store user data in session storage for the next steps
      sessionStorage.setItem("registrationData", JSON.stringify(data));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to OTP verification page
      navigate("/verify-otp");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a4d7c] via-[#2980B9] to-[#3498DB] flex flex-col items-center justify-center px-4 py-8">
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
          Create your account and get started for free
        </p>
      </div>

      {/* Registration Form */}
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-xl overflow-hidden border border-white/20 p-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="First Name"
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/60 h-12"
                  {...register("firstName", { required: "First name is required" })}
                />
                {errors.firstName && (
                  <p className="text-red-300 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <Input
                  placeholder="Last Name"
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/60 h-12"
                  {...register("lastName", { required: "Last name is required" })}
                />
                {errors.lastName && (
                  <p className="text-red-300 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Select 
                onValueChange={(value) => setValue("role", value)}
              >
                <SelectTrigger className="bg-white/10 border-white/10 text-white placeholder:text-white/60 h-12">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-300 text-xs mt-1">{errors.role.message}</p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-white/10 border-white/10 text-white placeholder:text-white/60 h-12"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-300 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  type="date"
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/60 h-12 pr-10"
                  {...register("dateOfBirth", { required: "Date of birth is required" })}
                />
                <Calendar className="absolute right-3 top-3 h-5 w-5 text-white/60 pointer-events-none" />
              </div>
              {errors.dateOfBirth && (
                <p className="text-red-300 text-xs mt-1">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-white hover:bg-white/90 text-[#3498DB] font-medium shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="w-4 h-4 border-2 border-[#3498DB] border-t-transparent rounded-full animate-spin mr-2"></span>
                  Processing...
                </span>
              ) : (
                <>
                  <User className="mr-2 h-4 w-4" />
                  Sign Up
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-white/80">
            Already have an account?{" "}
            <a 
              href="/" 
              className="text-white hover:underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
