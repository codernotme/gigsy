import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent } from "@clerk/clerk-sdk-node"; // Import Clerk WebhookEvent type
import { Webhook, WebhookRequiredHeaders } from "svix"; // Import Svix for validating Clerk webhooks
import { internal } from "./_generated/api";

// Function to validate the incoming webhook payload from Clerk
const validatePayload = async (req: Request): Promise<WebhookEvent | undefined> => {
  try {
    // Retrieve the raw payload text from the request
    const payload = await req.text();

    // Construct the headers required by Svix for verification
    const svixHeaders: WebhookRequiredHeaders = {
      "svix-id": req.headers.get("svix-id") || "",
      "svix-timestamp": req.headers.get("svix-timestamp") || "",
      "svix-signature": req.headers.get("svix-signature") || "",
    };

    // Retrieve the Clerk webhook secret from environment variables
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

    // Create a new Svix Webhook instance using the secret
    const webhook = new Webhook(webhookSecret);

    // Verify the payload and headers to ensure it's a legitimate request
    const event = webhook.verify(payload, svixHeaders) as WebhookEvent;

    // Return the verified event
    return event;
  } catch (error) {
    // Log any errors during validation and return undefined
    console.error("Webhook validation failed:", error);
    return undefined;
  }
};

// Function to handle the Clerk webhook
const handleClerkWebhook = httpAction(async (ctx, req) => {
  // Validate the incoming request payload
  const event = await validatePayload(req);

  // If validation fails, return a 400 response
  if (!event) {
    return new Response("Invalid webhook signature", { status: 400 });
  }

  try {
    // Handle the event based on its type
    switch (event.type) {
      case "user.created": // Handle user creation events
      case "user.updated": // Handle user update events
        // Check if the user already exists in the database
        const existingUser = await ctx.runQuery(internal.user.get, {
          clerkId: event.data.id,
        });

        if (existingUser) {
          // Log if the user already exists and handle updating details if necessary
          console.log(`User ${event.data.id} already exists. Updating user details.`);
          // Optionally, you might want to update the user details here
        } else {
          // If the user doesn't exist, create a new user in the database
          console.log("Creating new user with ID", event.data.id);
          await ctx.runMutation(internal.user.create, {
            clerkId: event.data.id,
            username: event.data.username || "",
            email: event.data.email_addresses[0]?.email_address || "",
            name: event.data.first_name + " " + event.data.last_name,
            phone: event.data.phone_numbers[0]?.phone_number || "",
            role: "individual", // Default role
            account_type: "individual", // Default account type
            avatar_url: event.data.profile_image_url || "", // Use a valid property from UserJSON
            bio: "", // Default bio
            skills: [], // Default skills
          });
        }
        break;

      default:
        // Log any unhandled webhook event types
        console.log("Unhandled Clerk webhook event type:", event.type);
    }
  } catch (error) {
    // Log any errors that occur while handling the webhook event and return a 500 response
    console.error("Error handling Clerk webhook event:", error);
    return new Response("Internal Server Error", { status: 500 });
  }

  // Return a 200 response to acknowledge successful handling of the webhook
  return new Response(null, { status: 200 });
});

// Initialize the HTTP router
const http = httpRouter();

// Define a route for handling Clerk user webhooks
http.route({
  path: "/clerk-user-webhooks", // The path where the webhook will be received
  method: "POST", // HTTP method for the webhook (POST)
  handler: handleClerkWebhook, // The function that handles the webhook
});

// Export the HTTP router as the default export
export default http;
