"use client"

import { postSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


export default function CreateRoute() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const mutation = useMutation(api.posts.createPost)
    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: ""
        }
    });

    function onSubmit(values: z.infer<typeof postSchema>) {
        startTransition(async () => {
            await mutation({
                body: values.content,
                title: values.title
            })
            toast.success("Post created successfully")
            form.reset()
            router.push("/")
        })
    }

    return (
        <div className="py-9">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Create Blog
                </h1>
                <p className="text-xl text-muted-foreground pt-4">Share your thoughts and experiences with the world</p>
            </div>
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Blog</CardTitle>
                    <CardDescription>Create new blog articles</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-y-4">
                            <Controller name="title" control={form.control} render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Title</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder=" Enter Blog Title" {...field} />
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                </Field>
                            )} />

                            <Controller name="content" control={form.control} render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Content</FieldLabel>
                                    <Textarea aria-invalid={fieldState.invalid} placeholder="Enter Blog Content" {...field} />
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                </Field>
                            )} />

                            <Button disabled={isPending} >{isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    <span className="ml-2">Creating...</span>
                                </>
                            ) : (
                                <span>Create Post</span>
                            )}</Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}