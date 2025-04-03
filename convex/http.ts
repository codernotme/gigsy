import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { auth } from "./auth";

const handleUserWebhook = httpAction(async (ctx, req) => {
  const event = await req.json();

  if (!event || !event.type) {
    return new Response("Invalid webhook payload", { status: 400 });
  }

  try {
    switch (event.type) {
      case "user.created":
        const existingUser = await ctx.runQuery(internal.user.get, {
          email: event.data.email_addresses?.[0]?.email_address ?? "",
        });

        if (!existingUser) {
          await ctx.runMutation(internal.user.create, {
            email: event.data.email_addresses?.[0]?.email_address ?? "",
            name: `${event.data.first_name ?? ""} ${event.data.last_name ?? ""}`.trim(),
            image: event.data.image_url ?? "",
            phone: event.data.phone_numbers?.[0]?.phone_number ?? "",
            isAnonymous: false,
            display_name: event.data.username ?? "",
            avatar_url: event.data.image_url ?? "",
            bio: "",
            skills: [],
            created_at: new Date().toISOString(),
          });
        }
        break;

      default:
        console.log("Unhandled event type:", event.type);
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }

  return new Response(null, { status: 200 });
});

const http = httpRouter();

auth.addHttpRoutes(http);

export default http;
