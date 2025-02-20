import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
    phone: v.string(),
    rollNo: v.optional(v.number()),
    role: v.union(v.literal("student"), v.literal("faculty")),
    prn: v.optional(v.number()),
    branch: v.optional(v.string()),
    div: v.optional(v.string()),
    batch: v.optional(v.number()),
    sem: v.optional(v.number()),
    year: v.optional(v.string()),
  }),

  groups: defineTable({
    branch: v.string(),
    div: v.string(),
    batch: v.number(),
    sem: v.number(),
    year: v.string(),
    subject: v.string(),
    type: v.string(),
    createdBy: v.id("users"),
  })
    .index("by_createdBy", ["createdBy"])
    .index("by_year_sem_branch_div", ["year", "sem", "branch", "div"]),

  messages: defineTable({
    groupId: v.id("groups"),
    senderId: v.id("users"),
    text: v.string(),
    updatedAt: v.number(),
  }).index("by_groupId", ["groupId"]),
});

export default schema;
