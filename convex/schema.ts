import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    ...authTables,
  profiles: defineTable({
    email: v.string(),
    account_type: v.string(),
    role: v.string(),
    display_name: v.optional(v.string()),
    avatar_url: v.optional(v.string()),
    bio: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    level: v.number(),
    is_verified: v.boolean(),
    verified_by: v.optional(v.string()),
    verified_at: v.optional(v.string()),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("email", ["email"])
  .index("by_account_type", ["account_type"]),

  wallets: defineTable({
    user_id: v.id("profiles"),
    balance: v.number(),
    total_earned: v.number(),
    total_spent: v.number(),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_user_id", ["user_id"]),

  transactions: defineTable({
    wallet_id: v.id("wallets"),
    amount: v.number(),
    type: v.string(),
    created_at: v.string(),
    description: v.optional(v.string()),
    reference_id: v.optional(v.string()),
    status: v.string(),
    recipient_wallet_id: v.optional(v.id("wallets")),
  }).index("by_wallet_id", ["wallet_id"]),

  projects: defineTable({
    title: v.string(),
    description: v.string(),
    owner_id: v.id("profiles"),
    budget: v.number(),
    deadline: v.string(),
    status: v.string(),
    skills_required: v.array(v.string()),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_owner_id", ["owner_id"]),

  bids: defineTable({
    project_id: v.id("projects"),
    bidder_id: v.id("profiles"),
    amount: v.number(),
    proposal: v.string(),
    status: v.string(),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_project_id", ["project_id"]),

  milestones: defineTable({
    project_id: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    due_date: v.string(),
    completed: v.boolean(),
    completed_at: v.optional(v.string()),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_project_id", ["project_id"]),

  events: defineTable({
    title: v.string(),
    description: v.string(),
    organizer_id: v.id("profiles"),
    start_date: v.string(),
    end_date: v.string(),
    location: v.optional(v.string()),
    max_participants: v.optional(v.number()),
    reward_amount: v.number(),
    status: v.string(),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_organizer_id", ["organizer_id"]),

  event_registrations: defineTable({
    event_id: v.id("events"),
    user_id: v.id("profiles"),
    status: v.string(),
    reward_claimed: v.boolean(),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_event_id", ["event_id"]),

  conversations: defineTable({
    name: v.optional(v.string()), // Optional name of the conversation (e.g., group name)
    is_group: v.boolean(), // Boolean to indicate if it's a group conversation
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_is_group", ["is_group"]),

  conversationMembers: defineTable({
    conversation_id: v.id("conversations"), // The ID of the conversation
    member_id: v.id("profiles"), // The ID of the user who is a member of the conversation
    last_seen_message_id: v.optional(v.id("messages")), // ID of the last message seen by the user
  })
    .index("by_conversation_id", ["conversation_id"])
    .index("by_member_id", ["member_id"]),

  messages: defineTable({
    conversation_id: v.id("conversations"), // ID of the conversation the message belongs to
    sender_id: v.id("profiles"), // ID of the user who sent the message
    content: v.string(), // Content of the message
    type: v.string(), // Type of the message (e.g., text, image, etc.)
    created_at: v.string(),
  }).index("by_conversation_id", ["conversation_id"]),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    passwordHash: v.optional(v.string()),
    emailVerified: v.optional(v.boolean()),
    userType: v.optional(v.union(v.literal("individual"), v.literal("group"))),
    isVerified: v.optional(v.boolean()),
    bids: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    oauthSubject: v.optional(v.string()),
  }).index("by_email", ["email"])
    .index("by_oauth", ["oauthSubject"]),

  verification_tokens: defineTable({
    email: v.string(),
    token: v.string(),
    expires: v.number(),
  }).index("by_token", ["token"]),

  password_reset_tokens: defineTable({
    email: v.string(),
    token: v.string(),
    expires: v.number(),
  }).index("by_token", ["token"]),
});
