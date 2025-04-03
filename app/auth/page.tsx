"use client";

import { useState, useEffect } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMinecraftToast } from "@/hooks/use-minecraft-toast";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { PasswordReset } from "./PasswordReset";

export default function AuthPage() {
  const [step, setStep] = useState<1 | 2 | "reset">(1);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    accountType: "individual",
    name: "",
    skills: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuthActions();
  const router = useRouter();
  const toast = useMinecraftToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authError = urlParams.get("authError");

    if (authError) {
      toast.error({
        title: "Authentication Required",
        description: "Please log in to continue.",
      });
    }
  }, [router, toast]);

  const handleNextStep = () => {
    setError(null);
    setStep((prev) => (prev === 1 ? 2 : prev));
  };

  const handlePreviousStep = () => {
    setError(null);
    setStep((prev) => (prev === 2 ? 1 : prev));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formDataObj = new FormData();
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
      formDataObj.append("flow", isSignUp ? "signUp" : "signIn");

      const response = await signIn("password", formDataObj);

      if (isSignUp && response?.redirect && response.redirect.toString().includes("otp")) {
        // Transition to OTP step only during signup
        setStep(2);
        toast.info({
          title: "OTP Required",
          description: "Please enter the OTP sent to your email.",
        });
      } else {
        toast.success({
          title: isSignUp ? "Signup Successful" : "Login Successful",
          description: isSignUp ? "Welcome to Gigsy!" : "Welcome back!",
        });

        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      setError("Failed to authenticate. Please try again.");

      toast.error({
        title: "Authentication Failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formDataObj = new FormData();
      formDataObj.append("email", formData.email);
      formDataObj.append("otp", formData.otp);
      formDataObj.append("flow", "email-verification");

      await signIn("password", formDataObj);

      toast.success({
        title: "Verification Complete",
        description: "You have been successfully verified!",
      });

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError("Failed to verify OTP. Please try again.");

      toast.error({
        title: "Verification Failed",
        description: "Please check your OTP and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/5 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {step === 1
              ? isSignUp
                ? "Sign Up"
                : "Login"
              : step === 2
              ? "Verify OTP"
              : "Reset Password"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {step === 1 && (
            <div className="space-y-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {isSignUp && (
                <>
                  <Label htmlFor="accountType">Account Type</Label>
                  <select
                    id="accountType"
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="individual">Individual</option>
                    <option value="group">Group</option>
                  </select>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="React, Node.js"
                    value={formData.skills}
                    onChange={handleInputChange}
                  />
                </>
              )}
              <Button onClick={handleAuthSubmit} disabled={isLoading}>
                {isLoading ? "Submitting..." : isSignUp ? "Sign Up" : "Login"}
              </Button>
              <Button
                variant="link"
                onClick={() => setIsSignUp((prev) => !prev)}
              >
                {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
              </Button>
              <Button
                variant="link"
                onClick={() => setStep("reset")}
              >
                Forgot Password?
              </Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                name="otp"
                placeholder="123456"
                value={formData.otp}
                onChange={handleInputChange}
                required
              />
              <Button onClick={handleVerifyOTP} disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
            </div>
          )}
          {step === "reset" && <PasswordReset />}
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Step {step === "reset" ? "Reset" : step} of {isSignUp ? 2 : 2}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}