import { v } from "convex/values";
import { internalQuery, internalMutation } from "./_generated/server";

// Mutation to create a new user in the database
export const create = internalMutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    phone: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    display_name: v.optional(v.string()),
    avatar_url: v.optional(v.string()),
    bio: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    created_at: v.optional(v.string()),
  },
  handler: async (
    { db },
    { email, name, image, phone, isAnonymous, display_name, avatar_url, bio, skills, created_at }
  ) => {
    const now = new Date().toISOString();
    await db.insert("users", {
      email,
      name: name ?? "",
      image: image ?? "",
      phone: phone ?? "",
      isAnonymous: isAnonymous ?? false,
      role: "individual", // Default role
      account_type: "individual", // Default account type
      display_name: display_name ?? "",
      avatar_url: avatar_url ?? "",
      bio: bio ?? "",
      skills: skills ?? [],
      created_at: created_at ?? now,
      updated_at: now, // Ensure updated_at is always set
    });
  },
});

// Query to retrieve a user by their _id or email
export const get = internalQuery({
  args: {
    _id: v.optional(v.id("users")),
    email: v.optional(v.string()),
  },
  handler: async ({ db }, { _id, email }) => {
    if (_id) {
      return await db.get(_id);
    }
    if (email) {
      return await db.query("users").filter(q => q.eq(q.field("email"), email)).first();
    }
    return null;
  },
});
