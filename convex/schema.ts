import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Gigsy Database Schema
 * This schema defines all the tables for the Gigsy platform, including user profiles,
 * projects, transactions, events, and messaging functionality.
 */
export default defineSchema({
    ...authTables, // Authentication tables from Convex

  /**
   * User profiles containing personal information and account details
   */
  profiles: defineTable({
    email: v.string(), // User's email address (unique identifier)
    account_type: v.string(), // Type of account (e.g., freelancer, client)
    role: v.string(), // User's role in the system
    display_name: v.optional(v.string()), // User's display name
    avatar_url: v.optional(v.string()), // URL to user's avatar/profile picture
    bio: v.optional(v.string()), // User biography or description
    skills: v.optional(v.array(v.string())), // List of user skills
    level: v.number(), // User experience level
    is_verified: v.boolean(), // Whether the user is verified (legacy field)
    verified_by: v.optional(v.string()), // Who verified the user
    verified_at: v.optional(v.string()), // When the user was verified
    created_at: v.string(), // Account creation timestamp
    updated_at: v.string(), // Last update timestamp
    // Authentication and verification fields
    passwordHash: v.optional(v.string()), // Hashed user password for authentication
    emailVerified: v.optional(v.boolean()), // Whether email has been verified
    userType: v.optional(v.union(v.literal("individual"), v.literal("group"))), // Individual or group account
    isVerified: v.optional(v.boolean()), // New verification status field
    bids: v.optional(v.number()), // Number of bids placed by user
    imageUrl: v.optional(v.string()), // Alternative profile image URL
    oauthSubject: v.optional(v.string()), // OAuth subject identifier for external auth
  }).index("email", ["email"])
  .index("by_account_type", ["account_type"]),

  /**
   * User wallets for managing platform currency and transactions
   */
  wallets: defineTable({
    user_id: v.id("profiles"), // Reference to profile owner
    balance: v.number(), // Current wallet balance
    total_earned: v.number(), // Total amount earned on platform
    total_spent: v.number(), // Total amount spent on platform
    created_at: v.string(), // Wallet creation timestamp
    updated_at: v.string(), // Last update timestamp
  }).index("by_user_id", ["user_id"]),

  /**
   * Transaction records for all financial activities
   */
  transactions: defineTable({
    wallet_id: v.id("wallets"), // Reference to wallet involved
    amount: v.number(), // Transaction amount
    type: v.string(), // Transaction type (deposit, withdrawal, payment, etc.)
    created_at: v.string(), // Transaction timestamp
    description: v.optional(v.string()), // Transaction description
    reference_id: v.optional(v.string()), // External reference ID if applicable
    status: v.string(), // Transaction status (pending, completed, failed)
    recipient_wallet_id: v.optional(v.id("wallets")), // Recipient wallet for transfers
  }).index("by_wallet_id", ["wallet_id"]),

  /**
   * Projects posted by clients for freelancers to bid on
   */
  projects: defineTable({
    title: v.string(), // Project title
    description: v.string(), // Project description
    owner_id: v.id("profiles"), // Client who posted the project
    budget: v.number(), // Project budget
    deadline: v.string(), // Project deadline
    status: v.string(), // Project status (open, in-progress, completed)
    skills_required: v.array(v.string()), // Skills needed for the project
    created_at: v.string(), // Project creation timestamp
    updated_at: v.string(), // Last update timestamp
  }).index("by_owner_id", ["owner_id"]),

  /**
   * Bids submitted by freelancers for projects
   */
  bids: defineTable({
    project_id: v.id("projects"), // Reference to project
    bidder_id: v.id("profiles"), // Freelancer who submitted the bid
    amount: v.number(), // Bid amount
    proposal: v.string(), // Bid proposal/description
    status: v.string(), // Bid status (pending, accepted, rejected)
    created_at: v.string(), // Bid submission timestamp
    updated_at: v.string(), // Last update timestamp
  }).index("by_project_id", ["project_id"]),

  /**
   * Project milestones for tracking progress
   */
  milestones: defineTable({
    project_id: v.id("projects"), // Reference to project
    title: v.string(), // Milestone title
    description: v.optional(v.string()), // Milestone description
    due_date: v.string(), // Milestone due date
    completed: v.boolean(), // Whether milestone is completed
    completed_at: v.optional(v.string()), // When milestone was completed
    created_at: v.string(), // Milestone creation timestamp
    updated_at: v.string(), // Last update timestamp
  }).index("by_project_id", ["project_id"]),

  /**
   * Community events and meetups
   */
  events: defineTable({
    title: v.string(), // Event title
    description: v.string(), // Event description
    organizer_id: v.id("profiles"), // User organizing the event
    start_date: v.string(), // Event start date/time
    end_date: v.string(), // Event end date/time
    location: v.optional(v.string()), // Event location
    max_participants: v.optional(v.number()), // Maximum number of participants
    reward_amount: v.number(), // Reward for participation
    status: v.string(), // Event status (upcoming, ongoing, completed)
    created_at: v.string(), // Event creation timestamp
    updated_at: v.string(), // Last update timestamp
  }).index("by_organizer_id", ["organizer_id"]),

  /**
   * User registrations for events
   */
  event_registrations: defineTable({
    event_id: v.id("events"), // Reference to event
    user_id: v.id("profiles"), // User registered for event
    status: v.string(), // Registration status (registered, attended, etc.)
    reward_claimed: v.boolean(), // Whether event reward has been claimed
    created_at: v.string(), // Registration timestamp
    updated_at: v.string(), // Last update timestamp
  }).index("by_event_id", ["event_id"]),

  /**
   * Messaging conversations between users
   */
  conversations: defineTable({
    name: v.optional(v.string()), // Optional name of the conversation (e.g., group name)
    is_group: v.boolean(), // Boolean to indicate if it's a group conversation
    created_at: v.string(), // Conversation creation timestamp
    updated_at: v.string(), // Last update timestamp
  }).index("by_is_group", ["is_group"]),

  /**
   * Membership records for conversations
   */
  conversationMembers: defineTable({
    conversation_id: v.id("conversations"), // The ID of the conversation
    member_id: v.id("profiles"), // The ID of the user who is a member of the conversation
    last_seen_message_id: v.optional(v.id("messages")), // ID of the last message seen by the user
  })
    .index("by_conversation_id", ["conversation_id"])
    .index("by_member_id", ["member_id"]),

  /**
   * Individual messages within conversations
   */
  messages: defineTable({
    conversation_id: v.id("conversations"), // ID of the conversation the message belongs to
    sender_id: v.id("profiles"), // ID of the user who sent the message
    content: v.string(), // Content of the message
    type: v.string(), // Type of the message (e.g., text, image, etc.)
    created_at: v.string(), // Message timestamp
  }).index("by_conversation_id", ["conversation_id"]),

  /**
   * Email verification tokens
   */
  verification_tokens: defineTable({
    email: v.string(), // User email to verify
    token: v.string(), // Verification token
    expires: v.number(), // Token expiration timestamp
  }).index("by_token", ["token"]),

  /**
   * Password reset tokens
   */
  password_reset_tokens: defineTable({
    email: v.string(), // User email for password reset
    token: v.string(), // Reset token
    expires: v.number(), // Token expiration timestamp
  }).index("by_token", ["token"]),
});
