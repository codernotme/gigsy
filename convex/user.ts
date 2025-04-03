import { v } from "convex/values";
import { internalQuery, internalMutation } from "./_generated/server";


// Mutation to create a new user in the database
export const create = internalMutation({
  args: {
    clerkId: v.string(), // Unique identifier from Clerk
    username: v.string(), // Unique username for the user
    email: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    role: v.optional(v.string()), // User role, default is "individual"
    account_type: v.optional(v.string()), // Account type: "individual" or "group"
    avatar_url: v.optional(v.string()), // URL to user's avatar/profile picture
    bio: v.optional(v.string()), // User biography or description
    skills: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = {
      ...args,
    };
    // Insert the new user record into the "users" table
    await ctx.db.insert("users", user);
  },
});

// Query to retrieve a user by their Clerk ID
export const get = internalQuery({
  args: {
    clerkId: v.string() // The Clerk ID of the user to be retrieved
  },
  handler: async (ctx, args) => {
    // Query the "users" table using the "by_clerkId" index to find the user with the specified Clerk ID
    return ctx.db.query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique(); // Expect a unique result since Clerk IDs are unique
  },
});
