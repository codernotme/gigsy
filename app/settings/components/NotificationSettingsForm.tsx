import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";

const notificationsFormSchema = z.object({
    emailNotifications: z.boolean(),
    marketingEmails: z.boolean(),
    projectUpdates: z.boolean(),
    achievementAlerts: z.boolean(),
});

export default function NotificationSettingsForm({
    onSubmit,
    defaultValues,
}: {
    onSubmit: (data: z.infer<typeof notificationsFormSchema>) => void;
    defaultValues: z.infer<typeof notificationsFormSchema>;
}) {
    const notificationsForm = useForm({
        resolver: zodResolver(notificationsFormSchema),
        defaultValues,
    });

    return (
        <Form {...notificationsForm}>
            <form onSubmit={notificationsForm.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={notificationsForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Email Notifications</FormLabel>
                                <FormDescription>Receive notifications via email</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
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
                                <FormDescription>Receive emails about new features and promotions</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
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
                                <FormDescription>Get notified about project milestones and activity</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
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
                                <FormDescription>Get notified when you earn achievements and level up</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Save Notification Settings
                </Button>
            </form>
        </Form>
    );
}
