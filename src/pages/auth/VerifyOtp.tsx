
import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/context/AuthContext";

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

const VerifyOtp = () => {
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [countdown, setCountdown] = React.useState(60);

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  async function onSubmit(data: OtpFormValues) {
    setIsLoading(true);
    const success = await verifyOtp(data.otp);
    setIsLoading(false);
    
    // Navigation will be handled in the auth context if successful
    if (!success) {
      form.setError("otp", { message: "Invalid verification code" });
    }
  }

  const resendOtp = () => {
    setCountdown(60);
    // Here you would call the API to resend the OTP
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container max-w-md mx-auto px-4">
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-gray-800">
            <h1 className="text-3xl font-bold text-white font-playfair mb-2 text-center">Verify OTP</h1>
            <p className="text-gray-400 text-center mb-6">
              Enter the 6-digit code sent to your email/phone
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel className="text-white text-center block">Verification Code</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          render={({ slots }) => (
                            <InputOTPGroup className="gap-2 flex justify-center">
                              {slots.map((slot, index) => (
                                <InputOTPSlot
                                  key={index}
                                  {...slot}
                                  index={index}
                                  className="w-10 h-14 text-xl bg-[#2a2a2a] border-gray-700 text-white"
                                />
                              ))}
                            </InputOTPGroup>
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
                
                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-gray-400">
                      Resend code in {countdown} seconds
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={resendOtp}
                      className="text-primary hover:underline"
                    >
                      Resend verification code
                    </button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VerifyOtp;
