import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";

const appearanceFormSchema = z.object({
    theme: z.enum(["system", "light", "dark"]),
    animationsEnabled: z.boolean(),
    pixelatedMode: z.boolean(),
});

export default function AppearanceSettingsForm({
    onSubmit,
    defaultValues,
}: {
    onSubmit: (data: z.infer<typeof appearanceFormSchema>) => void;
    defaultValues: z.infer<typeof appearanceFormSchema>;
}) {
    const appearanceForm = useForm({
        resolver: zodResolver(appearanceFormSchema),
        defaultValues,
    });

    return (
        <Form {...appearanceForm}>
            <form onSubmit={appearanceForm.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={appearanceForm.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Theme</FormLabel>
                            <div className="flex gap-4">
                                <label>
                                    <input type="radio" {...field} value="system" checked={field.value === "system"} />
                                    System
                                </label>
                                <label>
                                    <input type="radio" {...field} value="light" checked={field.value === "light"} />
                                    Light
                                </label>
                                <label>
                                    <input type="radio" {...field} value="dark" checked={field.value === "dark"} />
                                    Dark
                                </label>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={appearanceForm.control}
                    name="animationsEnabled"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Enable Animations</FormLabel>
                                <FormDescription>Show animations throughout the interface</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
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
                                <FormDescription>Enable full pixel-art style for maximum gaming vibes</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Save Appearance Settings
                </Button>
            </form>
        </Form>
    );
}
