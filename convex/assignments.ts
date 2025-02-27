import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
  args: {
    assignmentId: v.id("assignments"),
  },
  handler: async (ctx, { assignmentId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const assignment = await ctx.db.get(assignmentId);
    return assignment;
  },
});

export const getByGroupId = query({
  args: {
    groupId: v.id("groups"),
  },
  handler: async (ctx, { groupId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const group = await ctx.db.get(groupId);
    if (!group) return [];

    const assignments = await ctx.db
      .query("assignments")
      .withIndex("by_groupId", (q) => q.eq("groupId", groupId))
      .collect();

    return assignments;
  },
});

export const create = mutation({
  args: {
    groupId: v.id("groups"),
    title: v.string(),
    content: v.string(),
    deadline: v.number(),
    file: v.optional(v.id("_storage")),
    fileType: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { groupId, content, title, deadline, file, fileType }
  ) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const group = await ctx.db.get(groupId);
    if (!group) throw new Error("Group not found");

    if (group.createdBy !== userId) throw new Error("Unauthorized");

    let fileUrl = undefined;
    if (file) {
      fileUrl = await ctx.storage.getUrl(file);
    }

    const assignmentId = await ctx.db.insert("assignments", {
      groupId,
      title,
      content,
      file,
      deadline,
      fileType,
      fileUrl: fileUrl as string,
      votes: [],
    });

    return assignmentId;
  },
});

export const upvote = mutation({
  args: {
    assignmentId: v.id("assignments"),
  },
  handler: async (ctx, { assignmentId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const existingAssignment = await ctx.db.get(assignmentId);
    if (!existingAssignment) throw new Error("Assignment not found");

    // Initialize votes array if not present
    const currentVotes = existingAssignment.votes || [];

    // Check if the user has already voted
    if (currentVotes.includes(userId)) {
      throw new Error("You have already voted for this assignment");
    }

    // Update the votes array
    await ctx.db.patch(assignmentId, {
      votes: [...currentVotes, userId],
    });

    return existingAssignment._id;
  },
});

export const update = mutation({
  args: {
    assignmentId: v.id("assignments"),
    deadline: v.number(),
    title: v.string(),
    content: v.string(),
    file: v.optional(v.id("_storage")),
    fileType: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { assignmentId, title, content, deadline, file, fileType }
  ) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const existingAssignment = await ctx.db.get(assignmentId);
    if (!existingAssignment) throw new Error("Assignment not found");

    if (file) {
      if (existingAssignment.file) {
        await ctx.storage.delete(existingAssignment.file);
      }
      let fileUrl = undefined;
      fileUrl = await ctx.storage.getUrl(file);
      await ctx.db.patch(existingAssignment._id, {
        file,
        fileType,
        fileUrl: fileUrl as string,
      });
    }

    await ctx.db.patch(assignmentId, {
      title,
      content,
      deadline,
    });

    return existingAssignment._id;
  },
});
