import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
  args: v.object({}),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return {
      _id: user._id,
      name: user.name,
      image: user.image,
      email: user.email,
      emailVerificationTime: user.emailVerificationTime,
      phone: user.phone,
      phoneVerificationTime: user.phoneVerificationTime,
      isAnonymous: user.isAnonymous,
      role: user.role,
      account_type: user.account_type,
      display_name: user.display_name,
      avatar_url: user.avatar_url,
      bio: user.bio,
      skills: user.skills,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  },
});

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});
