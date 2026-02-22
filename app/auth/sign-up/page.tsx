"use client"

import { signupSchema, SignUpSchemaType } from "@/app/schemas/auth";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
    const form = useForm<SignUpSchemaType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    function onSubmit() {
        console.log("data");
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create an account to get started</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
                        <Controller name="name" control={form.control} render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Full Name</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="Akash Ray" {...field} />
                                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                            </Field>
                        )} />

                        <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="akash@gmail.com" type="email" {...field} />
                                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                            </Field>
                        )} />

                        <Controller name="password" control={form.control} render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="********" type="password" {...field} />
                                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                            </Field>
                        )} />
                        <Button >Sign Up</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}