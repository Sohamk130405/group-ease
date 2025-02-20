import { v } from "convex/values";
import { mutation, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const populateUser = async (ctx: QueryCtx, userId: Id<"users">) => {
  return await ctx.db.get(userId);
};

export const getByGroupId = query({
  args: {
    groupId: v.id("groups"),
  },
  handler: async (ctx, { groupId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const group = await ctx.db.get(groupId);
    if (!group) return [];

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_groupId", (q) => q.eq("groupId", groupId))
      .collect();

    const populatedMessages = await Promise.all(
      messages.map(async (message) => {
        const sender = await populateUser(ctx, message.senderId);
        return { ...message, sender };
      })
    );
    return populatedMessages;
  },
});

export const create = mutation({
  args: {
    text: v.string(),
    senderId: v.id("users"),
    groupId: v.id("groups"),
  },
  handler: async (ctx, { text, senderId, groupId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const group = await ctx.db.get(groupId);
    if (!group) throw new Error("Group not found");

    const messageId = await ctx.db.insert("messages", {
      groupId,
      text,
      senderId,
      updatedAt: Date.now(),
    });
    return messageId;
  },
});
