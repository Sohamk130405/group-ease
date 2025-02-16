import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Doc, Id } from "./_generated/dataModel";

const populateUser = async (ctx: QueryCtx, userId: Id<"users">) => {
  return await ctx.db.get(userId);
};

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const user = await ctx.db.get(userId);
    if (!user) return [];
    let groups: Doc<"groups">[] = [];
    if (user.role === "faculty") {
      groups = await ctx.db
        .query("groups")
        .withIndex("by_createdBy", (q) => q.eq("createdBy", userId))
        .collect();
    } else {
      groups = await ctx.db
        .query("groups")
        .withIndex("by_branch_div_batch", (q) => q.eq("branch", user.branch!))
        .collect();
      groups = await Promise.all(
        groups.map(async (group) => {
          const user = await populateUser(ctx, group.createdBy);
          return {
            ...group,
            user,
          };
        })
      );
    }
    return groups;
  },
});

export const create = mutation({
  args: {
    branch: v.string(),
    div: v.string(),
    batch: v.number(),
    sem: v.number(),
    year: v.string(),
    subject: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) throw new Error("Unauthorized");
    const user = await ctx.db.get(userId);
    if (!user || user.role !== "faculty") throw new Error("Unauthorized");
    const groupId = await ctx.db.insert("groups", {
      ...args,
      createdBy: userId,
    });
    return groupId;
  },
});
