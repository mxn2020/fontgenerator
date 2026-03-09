import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
export default defineSchema({
  ...authTables,
  generations: defineTable({
    inputText: v.string(), style: v.string(),
    fonts: v.array(v.object({ name: v.string(), css: v.string(), preview: v.string(), category: v.string() })),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
