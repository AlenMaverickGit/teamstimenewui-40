
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Check } from "lucide-react";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";

const VerifyInviteOTP: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState(true);
  const { toast } = useToast();

  // Get the invited user data from session storage
  const invitedUserData = JSON.parse(sessionStorage.getItem("invitedUserData") || "{}");
  const email = invitedUserData.email || "";

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    try {
      // Here would be the API call to verify OTP
      console.log("Verifying Invite OTP:", otp);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast({
        title: "Account Setup Complete!",
        description: "Your account has been set up successfully. Please login.",
        duration: 5000
      });
      
      // Navigate to login page with success flag
      navigate("/", { state: { inviteSuccess: true } });
    } catch (error) {
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendDisabled(true);
    try {
      // Here would be the API call to resend OTP
      console.log("Resending Invite OTP to:", email);
      
      // Reset timer
      setTimeLeft(5 * 60);
      
      toast({
        title: "OTP Resent",
        description: "A new verification code has been sent to your email",
        duration: 3000
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Resend OTP error:", error);
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
          Complete Your Account Setup
        </h1>
        <p className="text-white/80 text-sm">
          We've sent a verification code to <span className="font-medium">{email}</span>
        </p>
      </div>

      {/* OTP Verification Form */}
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-xl overflow-hidden border border-white/20 p-1">
          <div className="p-6 space-y-6">
            <div className="flex justify-center">
              <InputOTP 
                maxLength={6} 
                value={otp} 
                onChange={setOtp}
                className="gap-2 md:gap-3"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-12 md:w-14 md:h-14 text-xl bg-white/10 border-white/20 text-white" />
                  <InputOTPSlot index={1} className="w-12 h-12 md:w-14 md:h-14 text-xl bg-white/10 border-white/20 text-white" />
                  <InputOTPSlot index={2} className="w-12 h-12 md:w-14 md:h-14 text-xl bg-white/10 border-white/20 text-white" />
                  <InputOTPSlot index={3} className="w-12 h-12 md:w-14 md:h-14 text-xl bg-white/10 border-white/20 text-white" />
                  <InputOTPSlot index={4} className="w-12 h-12 md:w-14 md:h-14 text-xl bg-white/10 border-white/20 text-white" />
                  <InputOTPSlot index={5} className="w-12 h-12 md:w-14 md:h-14 text-xl bg-white/10 border-white/20 text-white" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="text-center">
              <div className="text-sm text-white/70 mb-4">
                Time remaining: <span className="font-semibold text-white">{formatTime(timeLeft)}</span>
              </div>

              <Button 
                onClick={handleVerifyOTP} 
                className="w-full h-12 bg-white hover:bg-white/90 text-[#3498DB] font-medium shadow-md"
                disabled={otp.length !== 6 || isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="w-4 h-4 border-2 border-[#3498DB] border-t-transparent rounded-full animate-spin mr-2"></span>
                    Verifying...
                  </span>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Complete Setup
                  </>
                )}
              </Button>

              <div className="mt-4">
                <button
                  onClick={handleResendOTP}
                  disabled={resendDisabled}
                  className={`text-sm text-white hover:underline focus:outline-none ${
                    resendDisabled ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Link */}
        <div className="text-center mt-6">
          <a 
            href="#" 
            className="text-white/80 hover:text-white hover:underline"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Cancel and return to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyInviteOTP;
