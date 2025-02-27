import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

const populateUser = async (ctx: QueryCtx, userId: Id<"users">) => {
  return await ctx.db.get(userId);
};

export const getByAssignmentId = query({
  args: {
    assignmentId: v.id("assignments"),
  },
  handler: async (ctx, { assignmentId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const assignment = await ctx.db.get(assignmentId);
    if (!assignment) return [];

    const submissions = await ctx.db
      .query("submissions")
      .withIndex("by_assignmentId", (q) => q.eq("assignmentId", assignmentId))
      .collect();

    const populatedsubmissions = await Promise.all(
      submissions.map(async (submission) => {
        const user = await populateUser(ctx, submission.userId);
        return { ...submission, user };
      })
    );

    return populatedsubmissions;
  },
});

export const create = mutation({
  args: {
    assignmentId: v.id("assignments"),
    file: v.optional(v.id("_storage")),
    fileType: v.optional(v.string()),
  },
  handler: async (ctx, { assignmentId, file, fileType }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Check if assignment exists
    const assignment = await ctx.db.get(assignmentId);
    if (!assignment) throw new Error("Assignment not found");

    // Check for deadline
    if (Date.now() > assignment.deadline) throw new Error("Deadline is over");

    // Check for existing submission by the user for this assignment
    const existingSubmission = await ctx.db
      .query("submissions")
      .withIndex("by_assignmentId_userId", (q) =>
        q.eq("assignmentId", assignmentId).eq("userId", userId)
      )
      .unique();

    // If there is an existing submission, delete the old file
    if (existingSubmission) {
      if (existingSubmission.file) {
        await ctx.storage.delete(existingSubmission.file);
      }

      let fileUrl = undefined;
      if (file) {
        fileUrl = await ctx.storage.getUrl(file);
      }

      await ctx.db.patch(existingSubmission._id, {
        file,
        fileType,
        fileUrl: fileUrl as string,
      });

      return existingSubmission._id;
    } else {
      let fileUrl = undefined;
      if (file) {
        fileUrl = await ctx.storage.getUrl(file);
      }
      const submissionId = await ctx.db.insert("submissions", {
        assignmentId,
        userId,
        file,
        marks: 0,
        fileType,
        fileUrl: fileUrl as string,
      });
      return submissionId;
    }
  },
});

export const update = mutation({
  args: {
    submissionId: v.id("submissions"),
    marks: v.optional(v.number()),
  },
  handler: async (ctx, { submissionId, marks }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const existingSubmission = await ctx.db.get(submissionId);
    if (!existingSubmission) throw new Error("Submission not found");

    const assignment = await ctx.db.get(existingSubmission.assignmentId);
    if (!assignment) throw new Error("Assignment not found");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "faculty") throw new Error("Unauthorized");
    await ctx.db.patch(submissionId, {
      marks,
    });

    return existingSubmission._id;
  },
});
