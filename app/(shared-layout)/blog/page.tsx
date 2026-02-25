"use client"

import { postSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function BlogRoute() {
    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: ""
        }
    });
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
                    <form>
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

                            <Button type="submit"> Create Post</Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}