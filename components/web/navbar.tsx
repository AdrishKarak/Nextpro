"use client"

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [hasLoggedOut, setHasLoggedOut] = useState(false);
    return (
        <nav className="w-full py-5 px-6 flex items-center justify-between border-b border-border mb-2">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        Next<span className="text-blue-500">Pro</span>
                    </h1>
                </Link>

                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({ variant: "ghost" })} href="/">Home</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/blog">Blog</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/create">Create</Link>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {isLoading || (hasLoggedOut && isAuthenticated) ? (
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-[88px] rounded-md bg-muted animate-pulse" />
                        <div className="h-9 w-[72px] rounded-md bg-muted animate-pulse" />
                    </div>
                ) : isAuthenticated ? (
                    <Button
                        disabled={isPending}
                        onClick={() =>
                            startTransition(async () => {
                                await authClient.signOut({
                                    fetchOptions: {
                                        onSuccess: () => {
                                            setHasLoggedOut(true);
                                            toast.success("Logged out successfully");
                                            router.push("/");
                                        },
                                        onError: (error) => {
                                            toast.error(error.error.message);
                                        },
                                    },
                                });
                            })
                        }
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Logging out...
                            </>
                        ) : (
                            "Logout"
                        )}
                    </Button>
                ) : (
                    <>
                        <Link className={buttonVariants()} href="/auth/sign-up">
                            Sign up
                        </Link>
                        <Link
                            className={buttonVariants({ variant: "outline" })}
                            href="/auth/login"
                        >
                            Login
                        </Link>
                    </>
                )}
                <ThemeToggle />
            </div>
        </nav>
    )
}