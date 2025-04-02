"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TowerControl, User, Users, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [accountType, setAccountType] = useState<'individual' | 'group'>('individual')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const email = (document.getElementById("email") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement).value

    // Frontend-only implementation
    console.log("Login attempt with:", { email, password })
    alert("Login functionality would connect to a backend in a real app")
    
    // Simulate successful login
    router.push('/dashboard')
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = {
      accountType,
      name: formData.get(accountType === 'individual' ? 'name' : 'team-name'),
      email: formData.get('register-email'),
      password: formData.get('register-password'),
      ...(accountType === 'group' && { teamLead: formData.get('team-lead'), teamSize: formData.get('member-count') }),
      ...(accountType === 'individual' && { skills: formData.get('skills') }),
    };

    // Frontend-only implementation
    console.log("Registration data:", payload)
    alert("Registration functionality would connect to a backend in a real app")
    
    // Simulate successful registration
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/5 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <TowerControl className="h-12 w-12 mx-auto mb-2" />
          <h1 className="text-3xl font-bold">Welcome to Gigsy</h1>
          <p className="text-muted-foreground">Level up your freelance career</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <Button type="submit" className="w-full">Sign In</Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="link" className="text-sm text-muted-foreground">
                  Forgot password?
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Join our community of freelancers and clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <RadioGroup 
                      defaultValue="individual" 
                      className="grid grid-cols-2 gap-4"
                      onValueChange={(value) => setAccountType(value as 'individual' | 'group')}
                    >
                      <div>
                        <RadioGroupItem 
                          value="individual" 
                          id="individual" 
                          className="peer sr-only" 
                        />
                        <Label
                          htmlFor="individual"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <User className="mb-3 h-6 w-6" />
                          <span className="text-center font-medium">Individual</span>
                          <span className="text-center text-xs text-muted-foreground">
                            Work solo on projects
                          </span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem 
                          value="group" 
                          id="group" 
                          className="peer sr-only" 
                        />
                        <Label
                          htmlFor="group"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Users className="mb-3 h-6 w-6" />
                          <span className="text-center font-medium">Team</span>
                          <span className="text-center text-xs text-muted-foreground">
                            Collaborate with others
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={accountType === 'individual' ? "name" : "team-name"}>
                      {accountType === 'individual' ? 'Full Name' : 'Team Name'}
                    </Label>
                    <Input 
                      id={accountType === 'individual' ? "name" : "team-name"} 
                      placeholder={accountType === 'individual' ? "John Doe" : "Team Awesome"} 
                    />
                  </div>
                  
                  {accountType === 'group' && (
                    <div className="space-y-2">
                      <Label htmlFor="team-lead">Team Lead Name</Label>
                      <Input id="team-lead" placeholder="Team Lead Name" />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" type="email" placeholder="name@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" type="password" />
                  </div>
                  
                  {accountType === 'individual' && (
                    <div className="space-y-2">
                      <Label htmlFor="skills">Primary Skills (comma separated)</Label>
                      <Input id="skills" placeholder="React, UI Design, Node.js" />
                    </div>
                  )}
                  
                  {accountType === 'group' && (
                    <div className="space-y-2">
                      <Label htmlFor="member-count">Initial Team Size</Label>
                      <Input id="member-count" type="number" min="2" max="10" defaultValue="3" />
                    </div>
                  )}
                  
                  <div className="rounded-md bg-accent/50 p-3 text-sm flex items-start">
                    <ShieldCheck className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                    <div>
                      <span className="font-medium">Verification Required</span>
                      <p className="text-muted-foreground">
                        Your account will need to be verified by a Campus Ambassador before you can start bidding on projects.
                      </p>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">Create Account</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}