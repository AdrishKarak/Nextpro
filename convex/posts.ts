import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { authComponent } from "./auth";

//Create a new post
export const createPost = mutation({
    args: { title: v.string(), body: v.string() },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const blogArticle = await ctx.db.insert("posts", {
            title: args.title,
            body: args.body,
            authorId: user._id
        })
        return blogArticle;
    }
})