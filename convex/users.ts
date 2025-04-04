import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";
import { v4 as uuidv4 } from "uuid";

// Mutation to update user data by Clerk ID
export const update = mutation({
  args: v.object({
    clerkId: v.string(), // Unique identifier from Clerk
    username: v.optional(v.string()), // Unique username for the user
    email: v.optional(v.string()), // Make email optional
    name: v.optional(v.string()), // Make name optional
    phone: v.optional(v.string()),
    role: v.optional(v.string()), // User role, default is "individual"
    account_type: v.optional(v.string()), // Account type: "individual" or "group"
    avatar_url: v.optional(v.string()), // URL to user's avatar/profile picture
    bio: v.optional(v.string()), // User biography or description
    skills: v.optional(v.array(v.string())), // List of user skills
  }),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", String(args.clerkId))) // Ensure clerkId is treated as a string
      .unique();

    if (!user) {
      console.error(`User not found in the database for clerkId: ${args.clerkId}`);
      throw new ConvexError("User not found in the database");
    }

    const updatedFields = {
      ...args,
    };

    await ctx.db.patch(user._id, updatedFields);

    return { ...user, ...updatedFields };
  },
});

// Mutation to handle image URL storage
export const uploadImage = mutation({
  args: v.object({
    imageUrl: v.string(), // The URL of the uploaded image
  }),
  handler: async (ctx, { imageUrl }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!user) {
      throw new ConvexError("User not found");
    }

    // Update the user's avatar URL in the database
    await ctx.db.patch(user._id, { avatar_url: imageUrl });

    return { avatar_url: imageUrl };
  },
});

// Query to get user data by Clerk ID
export const get = query({
  args: v.object({}),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      console.error("Unauthorized access attempt to users:get");
      throw new ConvexError("Unauthorized");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    const user = await ctx.db.get(currentUser._id);

    if (!user) {
      throw new ConvexError("User not found in the database");
    }

    return {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      imageUrl: user.avatar_url,
      role: user.role,
      account_type: user.account_type,
      phone: user.phone,
      bio: user.bio,
      skills: user.skills,
    };
  },
});

export const search = query({
  args: v.object({ username: v.string() }),
  handler: async (ctx, { username }) => {
    try {
      const users = await ctx.db
        .query("users")
        .withIndex("by_username", (q) => q.eq("username", username))
        .collect();
      return users.map((user) => ({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        imageUrl: user.avatar_url,
        role: user.role,
        account_type: user.account_type,
        phone: user.phone,
        bio: user.bio,
        skills: user.skills,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users.");
    }
  },
});
