
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Clock, Calendar, User, Key } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

type InvitedSignupFormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
};

const InvitedSignup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get email from URL query param
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvitedSignupFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      password: "",
    },
  });

  const onSubmit = async (data: InvitedSignupFormData) => {
    setIsLoading(true);
    try {
      // Here would be the API call to process the invited user signup
      console.log("Invited Signup data:", data);

      // Store user data in session storage for the next steps
      sessionStorage.setItem("invitedUserData", JSON.stringify({
        ...data,
        email
      }));

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to OTP verification page specifically for invited users
      navigate("/verify-invite-otp");
    } catch (error) {
      console.error("Invited signup error:", error);
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
          Complete your account setup
        </p>
      </div>

      {/* Invited Signup Form */}
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-xl overflow-hidden border border-white/20 p-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
            {/* Removed the readonly email input field */}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="First Name"
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/60 h-12"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-300 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Last Name"
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/60 h-12"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-300 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                className="bg-white/10 border-white/10 text-white placeholder:text-white/60 h-12 pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <Key className="absolute right-3 top-3 h-5 w-5 text-white/60 pointer-events-none" />
              {errors.password && (
                <p className="text-red-300 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  type="date"
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/60 h-12 pr-10"
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                />
                <Calendar className="absolute right-3 top-3 h-5 w-5 text-white/60 pointer-events-none" />
              </div>
              {errors.dateOfBirth && (
                <p className="text-red-300 text-xs mt-1">
                  {errors.dateOfBirth.message}
                </p>
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
                  Complete Sign Up
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

export default InvitedSignup;
