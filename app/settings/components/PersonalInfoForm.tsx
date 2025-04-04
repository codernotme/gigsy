import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const personalFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  bio: z.string().max(160, { message: "Bio must not exceed 160 characters" }).optional(),
  skills: z.array(z.string()).optional(),
  phone: z.string().optional(),
  avatarUrl: z.string().optional(), // URL for the profile image
});

export default function PersonalInfoForm({
  onSubmit,
  defaultValues,
  onImageUpload,
}: {
  onSubmit: (data: z.infer<typeof personalFormSchema>) => void;
  defaultValues: z.infer<typeof personalFormSchema>;
  onImageUpload: (imageUrl: string) => Promise<void>;
}) {
  const personalForm = useForm({
    resolver: zodResolver(personalFormSchema),
    defaultValues,
  });

  const [skills, setSkills] = useState<string[]>(defaultValues.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [imageUrl, setImageUrl] = useState(defaultValues.avatarUrl || "");
  const [isUploading, setIsUploading] = useState(false);

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const newSkills = [...skills, skillInput.trim()];
      setSkills(newSkills);
      personalForm.setValue("skills", newSkills);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(newSkills);
    personalForm.setValue("skills", newSkills);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const generatedUrl = URL.createObjectURL(file); // Generate a temporary URL for the file
      setImageUrl(generatedUrl);
      await onImageUpload(generatedUrl); // Pass the URL to the parent handler
      setIsUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setIsUploading(false);
    }
  };

  return (
    <Form {...personalForm}>
      <form onSubmit={personalForm.handleSubmit(onSubmit)} className="space-y-4">
        {imageUrl && (
          <div className="flex flex-col items-center">
            <img src={imageUrl} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
            <input type="file" accept="image/*" onChange={handleImageChange} disabled={isUploading} />
            {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
          </div>
        )}
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
                <Textarea placeholder="Tell us a bit about yourself" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>You can @mention other users and organizations</FormDescription>
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
                    <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-1 rounded-full hover:bg-muted p-1">
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
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={handleAddSkill}>
                  Add
                </Button>
              </div>
              <FormDescription>Add skills that showcase your expertise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
