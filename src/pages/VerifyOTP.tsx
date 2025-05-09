
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";

const VerifyOTP: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState(true);

  // Get the email from session storage
  const registrationData = JSON.parse(sessionStorage.getItem("registrationData") || "{}");
  const email = registrationData.email || "";

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
      console.log("Verifying OTP:", otp);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to create password page
      navigate("/create-password");
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
      console.log("Resending OTP to:", email);
      
      // Reset timer
      setTimeLeft(5 * 60);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Resend OTP error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5D2EFF] via-[#6B2BEB] to-[#814BFE] flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg">
        Verify <span className="text-yellow-300">Your Account</span>
      </h1>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 transition-transform transform hover:scale-[1.01]">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Enter OTP Code</h2>
          <p className="text-sm text-gray-600 mt-1">
            We've sent a 6-digit code to <span className="font-medium">{email}</span>
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="w-full flex justify-center">
            <InputOTP 
              maxLength={6} 
              value={otp} 
              onChange={setOtp}
              className="gap-2 md:gap-3"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-12 h-12 md:w-14 md:h-14 text-xl" />
                <InputOTPSlot index={1} className="w-12 h-12 md:w-14 md:h-14 text-xl" />
                <InputOTPSlot index={2} className="w-12 h-12 md:w-14 md:h-14 text-xl" />
                <InputOTPSlot index={3} className="w-12 h-12 md:w-14 md:h-14 text-xl" />
                <InputOTPSlot index={4} className="w-12 h-12 md:w-14 md:h-14 text-xl" />
                <InputOTPSlot index={5} className="w-12 h-12 md:w-14 md:h-14 text-xl" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-500 mb-4">
              Time remaining: <span className="font-semibold text-indigo-600">{formatTime(timeLeft)}</span>
            </div>
            <Button 
              onClick={handleVerifyOTP} 
              className="w-full"
              disabled={otp.length !== 6 || isLoading}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>

          <div className="text-center w-full">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                onClick={handleResendOTP}
                disabled={resendDisabled}
                className={`text-indigo-600 hover:underline focus:outline-none ${
                  resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
