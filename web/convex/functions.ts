import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const saveGeneration = mutation({
  args: { inputText: v.string(), style: v.string(), fonts: v.array(v.object({ name: v.string(), css: v.string(), preview: v.string(), category: v.string() })) },
  handler: async (ctx, args) => await ctx.db.insert("generations", { ...args, createdAt: Date.now() }),
});
export const getRecent = query({ args: {}, handler: async (ctx) => await ctx.db.query("generations").order("desc").take(20) });
export const getStatus = query({ args: {}, handler: async () => ({ status: "Online", timestamp: Date.now() }) });
