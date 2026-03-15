"use client";
import { Loader2, Search, X } from "lucide-react";
import { Input } from "../ui/input";
import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SearchInputProps {
    className?: string;
}

export function SearchInput({ className }: SearchInputProps) {
    const [term, setTerm] = useState("");
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const results = useQuery(
        api.posts.searchPosts,
        term.length >= 2 ? { limit: 5, term } : "skip"
    );

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTerm(e.target.value);
        setOpen(true);
    }

    function clear() {
        setTerm("");
        setOpen(false);
    }

    return (
        <div ref={containerRef} className={cn("relative w-full z-10", className)}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                    type="search"
                    placeholder="Search posts..."
                    className="w-full pl-9 pr-9 h-11 bg-background rounded-xl"
                    style={{ border: "1.5px solid rgba(244,63,94,0.25)" }}
                    value={term}
                    onChange={handleInputChange}
                    onFocus={() => term.length >= 2 && setOpen(true)}
                />
                {term && (
                    <button
                        onClick={clear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {open && term.length >= 2 && (
                <div className="absolute top-full mt-2 w-full rounded-xl border bg-popover text-popover-foreground shadow-lg outline-none animate-in fade-in-0 zoom-in-95 overflow-hidden"
                    style={{ borderColor: "rgba(244,63,94,0.2)", zIndex: 100 }}>
                    {results === undefined ? (
                        <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                            <Loader2 className="mr-2 size-4 animate-spin" style={{ color: "#f43f5e" }} />
                            Searching...
                        </div>
                    ) : results.length === 0 ? (
                        <p className="p-4 text-sm text-muted-foreground text-center">
                            No results for <span className="font-medium" style={{ color: "#f43f5e" }}>"{term}"</span>
                        </p>
                    ) : (
                        <div className="py-1">
                            {results.map((post) => (
                                <Link
                                    key={post._id}
                                    href={`/blog/${post._id}`}
                                    className="flex flex-col px-4 py-3 text-sm transition-colors hover:bg-accent cursor-pointer"
                                    style={{ borderBottom: "1px solid rgba(244,63,94,0.08)" }}
                                    onClick={clear}
                                >
                                    <p className="font-semibold truncate" style={{ color: "hsl(var(--foreground))" }}>
                                        {post.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground pt-0.5 truncate">
                                        {post.body.substring(0, 65)}…
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}