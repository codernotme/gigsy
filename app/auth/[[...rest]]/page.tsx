"use client";

import { SignUp, SignIn, UserButton } from "@clerk/clerk-react";
import { Unauthenticated, Authenticated } from "convex/react";
import { StrictMode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("authToken");
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <>
      <main>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pixel-bg px-auto">
          <div className="relative z-10 text-center space-y-8 px-4 max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 mb-4 hover:scale-105 transition-transform duration-300">
              GIGSY
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Welcome to Gigsy! Sign up or sign in to start your journey.
            </p>
            <Card className="p-6 space-y-4 mx-auto max-w-md bg-black text-black rounded-lg shadow-lg">
            <Unauthenticated>
              {isSignUp ? <SignUp /> : <SignIn />}
              <Button
                onClick={() => setIsSignUp(!isSignUp)}
                className="minecraft-button w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/80 transition-colors duration-300"
              >
                {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
              </Button>
            </Unauthenticated>
            </Card>
          </div>
        </section>
      </main>
      </>
  );
}