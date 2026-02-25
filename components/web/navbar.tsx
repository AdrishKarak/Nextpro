"use client"

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Menu, XIcon } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";

export function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [hasLoggedOut, setHasLoggedOut] = useState(false);
    const [open, setOpen] = useState(false);

    const navLinks = (
        <>
            <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/"
                onClick={() => setOpen(false)}
            >
                Home
            </Link>
            <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/blog"
                onClick={() => setOpen(false)}
            >
                Blog
            </Link>
            <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/create"
                onClick={() => setOpen(false)}
            >
                Create
            </Link>
        </>
    );

    const authButtons = (
        <>
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
                                        setOpen(false);
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
                    <Link
                        className={buttonVariants()}
                        href="/auth/sign-up"
                        onClick={() => setOpen(false)}
                    >
                        Sign up
                    </Link>
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        href="/auth/login"
                        onClick={() => setOpen(false)}
                    >
                        Login
                    </Link>
                </>
            )}
        </>
    );

    return (
        <nav className="w-full py-5 px-6 flex items-center justify-between border-b border-border mb-2">
            {/* Logo */}
            <Link href="/">
                <h1 className="text-3xl font-bold">
                    Next<span className="text-blue-500">Pro</span>
                </h1>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
                <div className="flex items-center gap-2">
                    {navLinks}
                </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
                {authButtons}
                <ThemeToggle />
            </div>

            {/* Mobile sidebar trigger */}
            <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="transition-none">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[280px] flex flex-col" showCloseButton={false}>
                        <SheetHeader className="flex flex-row items-center justify-between">
                            <SheetTitle>
                                <span className="text-2xl font-bold">
                                    Next<span className="text-blue-500">Pro</span>
                                </span>
                            </SheetTitle>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setOpen(false)}
                            >
                                <XIcon className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </SheetHeader>
                        <div className="flex flex-col gap-2 mt-4 px-4 flex-1">
                            {navLinks}
                        </div>
                        <SheetFooter className="border-t border-border px-4 py-4 flex flex-col gap-3">
                            <div className="flex items-center">
                                <span className="text-sm font-medium flex-1 text-center">Theme Selection</span>
                                <ThemeToggle />
                            </div>
                            <div className="flex flex-col gap-2">
                                {authButtons}
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}