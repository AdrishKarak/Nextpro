"use server";

import { postSchema } from "./schemas/blog";
import { fetchAuthMutation } from "@/lib/auth-server";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";

export async function createBlogAction(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const image = formData.get("image") as File;

        const parsed = postSchema.safeParse({
            title,
            content,
            image,
        });

        if (!parsed.success) {
            throw new Error("Invalid form data");
        }

        const uploadUrl = await fetchAuthMutation(
            api.posts.generateUploadUrl,
            {}
        );

        const bytes = await image.arrayBuffer();

        const uploadResult = await fetch(uploadUrl, {
            method: "POST",
            body: bytes,
        });

        if (!uploadResult.ok) {
            throw new Error("Failed to upload image");
        }

        const { storageId } = await uploadResult.json();

        await fetchAuthMutation(api.posts.createPost, {
            title,
            body: content,
            imageStorageId: storageId,
        });

        updateTag("blog");

    } catch (error) {
        console.error(error);
        return { error: "Failed to upload image" };
    }

    redirect("/blog");
}