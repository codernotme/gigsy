"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoForm from "./components/PersonalInfoForm";
import NotificationSettingsForm from "./components/NotificationSettingsForm";
import AppearanceSettingsForm from "./components/AppearanceSettingsForm";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SettingsPage() {
  const user = useQuery(api.users.get); // Fetch user data from Convex
  const updateUser = useMutation(api.users.update);
  const uploadImage = useMutation(api.users.uploadImage);

  const [activeTab, setActiveTab] = useState("profile");

  const handlePersonalSubmit = async (data: any) => {
    try {
      // Map `firstName` and `lastName` to `name`, and `avatarUrl` to `avatar_url`
      const payload = {
        ...data,
        name: `${data.firstName} ${data.lastName}`,
        avatar_url: data.avatarUrl,
      };
      delete payload.firstName;
      delete payload.lastName;
      delete payload.avatarUrl;

      await updateUser({
        clerkId: user?._id, // Ensure the correct clerkId is passed
        ...payload,
      });
      console.log("Personal info updated successfully:", payload);
    } catch (error) {
      console.error("Failed to update personal info:", error);
    }
  };

  const handleImageUpload = async (imageUrl: string) => {
    try {
      const { avatar_url } = await uploadImage({ imageUrl });
      console.log("Image URL stored successfully:", avatar_url);
    } catch (error) {
      console.error("Failed to store image URL:", error);
    }
  };

  const handleNotificationsSubmit = (data: any) => {
    console.log("Notifications submitted:", data);
  };

  const handleAppearanceSubmit = (data: any) => {
    console.log("Appearance submitted:", data);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8">Account Settings</h1>
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 max-w-lg mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <PersonalInfoForm
            onSubmit={handlePersonalSubmit}
            onImageUpload={handleImageUpload}
            defaultValues={{
              firstName: user?.name?.split(" ")[0] || "",
              lastName: user?.name?.split(" ")[1] || "",
              username: user?.username || "",
              bio: user?.bio || "",
              skills: user?.skills || [],
              phone: user?.phone || "",
              avatarUrl: user?.imageUrl || "",
            }}
          />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationSettingsForm
            onSubmit={handleNotificationsSubmit}
            defaultValues={{
              emailNotifications: false,
              marketingEmails: false,
              projectUpdates: false,
              achievementAlerts: false,
            }}
          />
        </TabsContent>
        <TabsContent value="appearance">
          <AppearanceSettingsForm
            onSubmit={handleAppearanceSubmit}
            defaultValues={{
              theme: "system",
              animationsEnabled: true,
              pixelatedMode: false,
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
