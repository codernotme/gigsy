"use client"

import { useState, useRef, useEffect } from "react"
import { useUser, useClerk } from "@clerk/nextjs"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { useMinecraftToast } from "@/hooks/use-minecraft-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Upload, 
  Shield, 
  Bell, 
  Palette, 
  Save, 
  Trash2, 
  Camera, 
  AlertCircle,
  CheckCircle
} from "lucide-react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

// Form schema for personal info
const personalFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  bio: z.string().max(160, { message: "Bio must not exceed 160 characters" }).optional(),
  skills: z.array(z.string()).optional(),
  phone: z.string().optional(),
});

// Form schema for notification settings
const notificationsFormSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  projectUpdates: z.boolean(),
  achievementAlerts: z.boolean(),
});

// Form schema for appearance settings
const appearanceFormSchema = z.object({
  theme: z.enum(["system", "light", "dark"]),
  animationsEnabled: z.boolean(),
  pixelatedMode: z.boolean(),
});

export default function SettingsPage() {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const { signOut } = useClerk();
  const toast = useMinecraftToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  // Fetch user data from Convex
  const convexUserData = useQuery(api.users.get);

  useEffect(() => {
    if (convexUserData === undefined) {
      console.error("Failed to fetch user data: Unauthorized");
      toast.error({
        title: "Unauthorized",
        description: "You are not authorized to access this data. Please sign in.",
      });
    }
  }, [convexUserData, toast]);

  // Set up mutation for updating user data in Convex
  const updateUserInConvex = useMutation(api.users.update);

  // Personal info form
  const personalForm = useForm<z.infer<typeof personalFormSchema>>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      bio: "",
      skills: [],
      phone: "",
    },
  });

  // Notifications form
  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      marketingEmails: false,
      projectUpdates: true,
      achievementAlerts: true,
    },
  });

  // Appearance form
  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      animationsEnabled: true,
      pixelatedMode: false,
    },
  });

  // Update form values when user data is loaded from both Clerk and Convex
  useEffect(() => {
    if (isClerkLoaded && clerkUser && convexUserData) {
      personalForm.reset({
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        username: convexUserData.username || clerkUser.username || "",
        bio: convexUserData.bio || "",
        skills: convexUserData.skills || [],
        phone: convexUserData.phone || "",
      });
      setProfileImage(convexUserData.imageUrl || clerkUser.imageUrl);
      setSkills(convexUserData.skills || []);
    }
  }, [isClerkLoaded, clerkUser, convexUserData, personalForm]);

  // Handle adding a skill tag
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const newSkills = [...skills, skillInput.trim()];
      setSkills(newSkills);
      personalForm.setValue('skills', newSkills);
      setSkillInput('');
    }
  };

  // Handle removing a skill tag
  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
    personalForm.setValue('skills', newSkills);
  };

  // Handle profile image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // In a real implementation, you would upload the file to your server/Clerk
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      
      // In production, you would do something like:
      // await clerkUser?.setProfileImage({ file });
      
      // Update profile image in Convex
      if (clerkUser) {
        await updateUserInConvex({
          clerkId: clerkUser.id,
          username: convexUserData?.username || clerkUser.username || "",
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          avatar_url: imageUrl,
        });
      }
      
      setIsUploading(false);
      toast.success({
        title: "Profile Image Updated",
        description: "Your profile image has been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      setIsUploading(false);
      toast.error({
        title: "Upload Failed",
        description: "There was a problem uploading your image. Please try again.",
      });
    }
  };

  // Submit handler for personal info form
  const onPersonalSubmit = async (data: z.infer<typeof personalFormSchema>) => {
    try {
      // Update user info in Convex
      if (clerkUser) {
        await updateUserInConvex({
          clerkId: clerkUser.id,
          username: data.username,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          name: `${data.firstName} ${data.lastName}`.trim(),
          phone: data.phone,
          bio: data.bio,
          skills: data.skills,
          avatar_url: clerkUser.imageUrl,
        });
      }

      toast.success({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      toast.error({
        title: "Update Failed",
        description: "There was a problem updating your profile. Please try again.",
      });
    }
  };

  // Submit handler for notifications form
  const onNotificationsSubmit = async (data: z.infer<typeof notificationsFormSchema>) => {
    console.log("Notification settings submitted:", data);
    toast.success({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  // Submit handler for appearance form
  const onAppearanceSubmit = async (data: z.infer<typeof appearanceFormSchema>) => {
    console.log("Appearance settings submitted:", data);
    toast.success({
      title: "Appearance Settings Saved",
      description: "Your appearance preferences have been updated.",
    });
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (confirmDelete) {
      toast.info({
        title: "Account Deletion Requested",
        description: "We've received your request to delete your account.",
      });
    }
  };

  if (!isClerkLoaded) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Account Settings</h1>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 max-w-lg mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Profile Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Image</CardTitle>
                  <CardDescription>Update your profile picture</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative group mb-6">
                    <Avatar className="h-32 w-32 border-4 border-primary/20">
                      <AvatarImage src={profileImage || ""} />
                      <AvatarFallback className="text-4xl">
                        {clerkUser?.firstName?.charAt(0) || clerkUser?.username?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? "Uploading..." : "Upload New Image"}
                  </Button>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...personalForm}>
                    <form onSubmit={personalForm.handleSubmit(onPersonalSubmit)} className="space-y-4">
                      <FormField
                        control={personalForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your first name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us a bit about yourself" 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              You can @mention other users and organizations
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalForm.control}
                        name="skills"
                        render={() => (
                          <FormItem>
                            <FormLabel>Skills</FormLabel>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                  {skill}
                                  <button 
                                    type="button" 
                                    onClick={() => handleRemoveSkill(skill)}
                                    className="ml-1 rounded-full hover:bg-muted p-1"
                                  >
                                    ×
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                placeholder="Add a skill (e.g., JavaScript, Design)"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddSkill();
                                  }
                                }}
                              />
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={handleAddSkill}
                              >
                                Add
                              </Button>
                            </div>
                            <FormDescription>
                              Add skills that showcase your expertise
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...notificationsForm}>
                  <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                    <FormField
                      control={notificationsForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Email Notifications</FormLabel>
                            <FormDescription>
                              Receive notifications via email
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Marketing Emails</FormLabel>
                            <FormDescription>
                              Receive emails about new features and promotions
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="projectUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Project Updates</FormLabel>
                            <FormDescription>
                              Get notified about project milestones and activity
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="achievementAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Achievement Alerts</FormLabel>
                            <FormDescription>
                              Get notified when you earn achievements and level up
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Notification Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how Gigsy looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...appearanceForm}>
                  <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-6">
                    <FormField
                      control={appearanceForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Theme</FormLabel>
                          <div className="flex flex-col gap-4 sm:flex-row">
                            <Label
                              htmlFor="theme-system"
                              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:border-primary ${
                                field.value === "system" ? "border-primary" : ""
                              }`}
                            >
                              <input
                                type="radio"
                                id="theme-system"
                                className="sr-only"
                                {...field}
                              />
                              <div className="mb-2 rounded-md bg-muted p-2">
                                <Palette className="h-6 w-6" />
                              </div>
                              <div className="font-medium">System</div>
                            </Label>
                            <Label
                              htmlFor="theme-light"
                              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:border-primary ${
                                field.value === "light" ? "border-primary" : ""
                              }`}
                            >
                              <input
                                type="radio"
                                id="theme-light"
                                className="sr-only"
                                {...field}
                                value="light"
                                checked={field.value === "light"}
                              />
                              <div className="mb-2 rounded-md bg-muted p-2">
                                <Palette className="h-6 w-6" />
                              </div>
                              <div className="font-medium">Light</div>
                            </Label>
                            <Label
                              htmlFor="theme-dark"
                              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:border-primary ${
                                field.value === "dark" ? "border-primary" : ""
                              }`}
                            >
                              <input
                                type="radio"
                                id="theme-dark"
                                className="sr-only"
                                {...field}
                                checked={field.value === "dark"}
                              />
                              <div className="mb-2 rounded-md bg-muted p-2">
                                <Palette className="h-6 w-6" />
                              </div>
                              <div className="font-medium">Dark</div>
                            </Label>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={appearanceForm.control}
                      name="animationsEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Animations</FormLabel>
                            <FormDescription>
                              Show animations throughout the interface
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={appearanceForm.control}
                      name="pixelatedMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Pixelated Mode</FormLabel>
                            <FormDescription>
                              Enable full pixel-art style for maximum gaming vibes
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Appearance Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>View your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Email Address</Label>
                    <div className="flex items-center mt-1">
                      <p className="font-medium">{clerkUser?.emailAddresses[0]?.emailAddress}</p>
                      <Badge variant="outline" className="ml-2">
                        {clerkUser?.emailAddresses[0]?.verification?.status === "verified" ? (
                          <><CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Verified</>
                        ) : (
                          <><AlertCircle className="h-3 w-3 mr-1 text-yellow-500" /> Unverified</>
                        )}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Account Created</Label>
                    <p className="font-medium mt-1">
                      {clerkUser?.createdAt ? new Date(clerkUser.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Account Level</Label>
                    <p className="font-medium mt-1">Level 42</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                  <CardDescription>Manage your security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Password</Label>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-medium">••••••••••••</p>
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Two-Factor Authentication</Label>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-medium">Not Enabled</p>
                      <Button variant="outline" size="sm">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Active Sessions</Label>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-medium">1 active session</p>
                      <Button variant="outline" size="sm">
                        Manage Sessions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
