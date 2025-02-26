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
        const sender = await populateUser(ctx, submission.userId);
        return { ...submission, sender };
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

    const assignment = await ctx.db.get(assignmentId);
    if (!assignment) throw new Error("assignment not found");

    if (Date.now() > assignment.deadline) throw new Error("Deadline is over");

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
  },
});

export const update = mutation({
  args: {
    submissionId: v.id("submissions"),
    marks: v.optional(v.number()),
    file: v.optional(v.id("_storage")),
    fileType: v.optional(v.string()),
  },
  handler: async (ctx, { submissionId, marks, file, fileType }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const existingSubmission = await ctx.db.get(submissionId);
    if (!existingSubmission) throw new Error("Submission not found");

    const assignment = await ctx.db.get(existingSubmission.assignmentId);
    if (!assignment) throw new Error("Assignment not found");

    const user = await ctx.db.get(userId);
    if (!user) throw new Error("Unauthorized");
    const isFaculty = user.role === "faculty";

    if (isFaculty) {
      await ctx.db.patch(submissionId, {
        marks,
      });
    } else {
      if (file && Date.now() > assignment.deadline) {
        throw new Error("Deadline is over");
      }
      if (file) {
        if (existingSubmission.file) {
          await ctx.storage.delete(existingSubmission.file);
        }
        const fileUrl = (await ctx.storage.getUrl(file)) as string;
        await ctx.db.patch(submissionId, {
          file,
          fileType,
          fileUrl,
        });
      }
    }

    return existingSubmission._id;
  },
});
