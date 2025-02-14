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
});

export default schema;
