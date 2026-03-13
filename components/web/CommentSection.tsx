"use client";

import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/app/schemas/comment";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";

export function CommentSection() {
    const params = useParams<{ postid: Id<"posts"> }>();
    const [isPending, startTransition] = useTransition();

    const createComment = useMutation(api.comments.createComment);

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            body: "",
            postId: params.postid,
        },
    });

    async function onSubmit(data: z.infer<typeof commentSchema>) {
        startTransition(async () => {
            try {
                await createComment(data);

                toast.success("Comment posted");
            } catch {
                toast.error("Failed to create post");
            }
        });
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 border-b">
                <MessageSquare className="size-5" />
                <h2 className="text-xl font-bold">Comments</h2>
            </CardHeader>

            <CardContent className="space-y-8">
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        name="body"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Comment</FieldLabel>

                                <Textarea
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Share your thoughts"
                                    {...field}
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Button disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                <span>Posting...</span>
                            </>
                        ) : (
                            <span>Comment</span>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}