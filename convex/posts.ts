import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

//Create a new post
export const createPost = mutation({
    args: { title: v.string(), body: v.string(), imageStorageId: v.id("_storage") },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const blogArticle = await ctx.db.insert("posts", {
            title: args.title,
            body: args.body,
            authorId: user._id,
            imageStorageId: args.imageStorageId
        })
        return blogArticle;
    }
})


export const getPosts = query({
    args: {},
    handler: async (ctx) => {
        const posts = await ctx.db.query("posts").order("desc").collect();

        return await Promise.all(
            posts.map(async (post) => {
                const resolvedImageUrl = post.imageStorageId !== undefined ? await ctx.storage.getUrl(post.imageStorageId) : null;
                return {
                    ...post,
                    imageUrl: resolvedImageUrl
                }
            })
        )
    }
})

export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        return await ctx.storage.generateUploadUrl();
    }
})
