import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

// Mutation to update user data by Clerk ID
export const update = mutation({
  args: v.object({
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
  }),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found in the database");
    }

    const updatedFields = {
      ...args,
    };

    await ctx.db.patch(user._id, updatedFields);

    return { ...user, ...updatedFields };
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
