import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Doc, Id } from "./_generated/dataModel";

const populateUser = async (ctx: QueryCtx, userId: Id<"users">) => {
  return await ctx.db.get(userId);
};

export const getById = query({
  args: {
    id: v.id("groups"),
  },
  handler: async (ctx, args) => {
    const group = await ctx.db.get(args.id);
    if (!group) return null;
    const user = await populateUser(ctx, group.createdBy);
    return {
      ...group,
      user,
    };
  },
});

export const get = query({
  args: {
    branch: v.string(),
    div: v.string(),
    sem: v.number(),
    year: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const user = await ctx.db.get(userId);
    if (!user || user.role !== "faculty") return [];
    let groups = await ctx.db
      .query("groups")
      .withIndex("by_year_sem_branch_div", (q) =>
        q
          .eq("year", args.year)
          .eq("sem", args.sem)
          .eq("branch", args.branch)
          .eq("div", args.div)
      )
      .collect();

    const filteredGroups = groups.filter((group) =>
      group.batch === 0
        ? "All"
        : group.batch === user.batch || group.batch === 0
          ? "All"
          : group.batch === 0
    );
    groups = await Promise.all(
      filteredGroups.map(async (group) => {
        const user = await populateUser(ctx, group.createdBy);
        return {
          ...group,
          user,
        };
      })
    );
    return groups;
  },
});

export const getMyGroups = query({
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
        .withIndex("by_year_sem_branch_div", (q) =>
          q
            .eq("year", user.year!)
            .eq("sem", user.sem!)
            .eq("branch", user.branch!)
            .eq("div", user.div!)
        )
        .collect();
      const filteredGroups = groups.filter((group) =>
        group.batch === 0
          ? "All"
          : group.batch === user.batch || group.batch === 0
            ? "All"
            : group.batch === 0
      );
      groups = await Promise.all(
        filteredGroups.map(async (group) => {
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
