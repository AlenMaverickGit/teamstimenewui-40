
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Calendar } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-[#5D2EFF] via-[#6B2BEB] to-[#814BFE] flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg">
        Join <span className="text-yellow-300">TeamsTime</span>
      </h1>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 transition-transform transform hover:scale-[1.01]">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
          <p className="text-sm text-gray-600 mt-1">
            Fill in your details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register("firstName", { required: "First name is required" })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              onValueChange={(value) => setValue("role", value)}
            >
              <SelectTrigger>
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
              <p className="text-red-500 text-xs">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <div className="relative">
              <Input
                id="dateOfBirth"
                type="date"
                className="pr-10"
                {...register("dateOfBirth", { required: "Date of birth is required" })}
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full py-2 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sign Up"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a 
              href="/" 
              className="text-indigo-600 hover:underline"
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
