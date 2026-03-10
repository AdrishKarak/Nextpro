"use server"

import z from "zod";
import { postSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export async function createBlogAction(values: z.infer<typeof postSchema>) {
    console.log("Action triggered");

    try {
        const parsed = postSchema.safeParse(values);
        if (!parsed.success) {
            throw new Error("Something went wrong")
        }

        const token = await getToken();

        const imageUrl = await fetchMutation(api.posts.generateUploadUrl, {}, { token });

        const uploadResult = await fetch(imageUrl, {
            method: "POST",
            headers: {
                "Content-Type": parsed.data.image.type
            },
            body: parsed.data.image,
        })

        if (!uploadResult.ok) {
            throw new Error("Failed to upload image");
        }

        const { storageId } = await uploadResult.json();
        await fetchMutation(api.posts.createPost, {
            title: parsed.data.title,
            body: parsed.data.content,
            imageStorageId: storageId
        }, { token });

    } catch (error) {
        return {
            error: "Failed to upload image"
        }
    }

    return redirect("/");
}