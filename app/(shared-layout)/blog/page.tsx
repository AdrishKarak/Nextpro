
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchInput } from "@/components/web/SearchInput";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { ArrowRight, BookOpen, Clock, Pencil } from "lucide-react";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Blog | Nextpro",
    description: "Read the latest blogs and stories from our community",
    category: "Blogs & Articles",
    keywords: ["Blog", "Articles", "Nextpro"],
    creator: "Adrish",
    publisher: "Adrish",
    authors: [{ name: "Adrish Karak" }],
};

export default function BlogPage() {
    return (
        <div className="min-h-screen">

            {/* ── Hero header ─────────────────────────────────────────────────────── */}
            <div className="relative border-b" style={{ zIndex: 50 }}>
                {/* Subtle dot pattern */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(244,63,94,0.08) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                {/* Rose glow */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse, rgba(244,63,94,0.1) 0%, transparent 70%)",
                    }}
                />

                <div className="relative z-10 mx-auto px-4 pt-16 pb-14 text-center" style={{ maxWidth: 600 }}>
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
                        style={{ background: "rgba(244,63,94,0.1)", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.25)" }}>
                        <BookOpen size={11} />
                        Community Stories
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                        Blogs &{" "}
                        <span className="relative inline-block" style={{ color: "#f43f5e" }}>
                            Stories
                            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                                <path d="M2 6 C60 2,130 7,198 4" stroke="#f43f5e" strokeWidth="2.5"
                                    strokeLinecap="round" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        Read the latest blogs and stories from our community
                    </p>

                    {/* Search — full width matches heading/description */}
                    <SearchInput className="w-full" />
                </div>
            </div>

            {/* ── Blog list ───────────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 py-12 relative" style={{ zIndex: 10 }}>
                {/* Section label row */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <span className="w-1 h-5 rounded-full" style={{ background: "#f43f5e" }} />
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                            Latest Posts
                        </span>
                    </div>
                    <Link
                        href="/create"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                        style={{ color: "#f43f5e" }}
                    >
                        <Pencil size={13} />
                        Write a post
                    </Link>
                </div>

                <Suspense fallback={<SkeletonLoadingUi />}>
                    <LoadBlogList />
                </Suspense>
            </div>
        </div>
    );
}

/* ── Blog list (cached) ──────────────────────────────────────────────────── */
async function LoadBlogList() {
    cacheLife("hours");
    cacheTag("blog");

    const data = await fetchQuery(api.posts.getPosts);

    if (!data?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(244,63,94,0.08)", border: "1.5px solid rgba(244,63,94,0.2)" }}>
                    <BookOpen size={28} style={{ color: "#f43f5e" }} />
                </div>
                <p className="text-lg font-semibold text-muted-foreground">No posts yet</p>
                <p className="text-sm text-muted-foreground">Be the first to write a story.</p>
                <Link
                    href="/create"
                    className={buttonVariants({ size: "sm" })}
                    style={{ background: "#f43f5e", color: "white", border: "none" }}
                >
                    Write a Post
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((post) => (
                <Card
                    key={post._id}
                    className="blog-card group flex flex-col pt-0 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{ border: "1.5px solid rgba(244,63,94,0.15)" }}
                >
                    {/* Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-muted shrink-0">
                        <Image
                            src={
                                post.imageUrl ??
                                "https://images.unsplash.com/photo-1533150783171-ce47d5c2b6ef?fm=jpg&q=60&w=800&auto=format&fit=crop"
                            }
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Rose overlay on hover */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: "rgba(244,63,94,0.06)" }}
                        />
                    </div>

                    <CardContent className="flex flex-col flex-1 pt-5 pb-2 px-5">
                        {/* Tag row */}
                        <div className="flex items-center gap-2 mb-3">
                            <span
                                className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
                                style={{ background: "rgba(244,63,94,0.1)", color: "#f43f5e" }}
                            >
                                Article
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Clock size={10} />
                                5 min read
                            </span>
                        </div>

                        {/* Title */}
                        <Link href={`/blog/${post._id}`} className="group/title mb-2">
                            <h2
                                className="text-xl font-bold leading-snug transition-colors duration-200 group-hover/title:text-rose-500 line-clamp-2"
                                style={{ color: "hsl(var(--foreground))" }}
                            >
                                {post.title}
                            </h2>
                        </Link>

                        {/* Excerpt */}
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                            {post.body}
                        </p>
                    </CardContent>

                    <CardFooter className="px-5 pb-5 pt-3">
                        <Link
                            href={`/blog/${post._id}`}
                            className={buttonVariants({
                                className: "w-full",
                            })}
                        >
                            Read More
                            <ArrowRight size={15} />
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

/* ── Skeleton ────────────────────────────────────────────────────────────── */
function SkeletonLoadingUi() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
                .fill(null)
                .map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col rounded-2xl overflow-hidden"
                        style={{ border: "1.5px solid rgba(244,63,94,0.12)" }}
                    >
                        <Skeleton className="h-48 w-full rounded-none" />
                        <div className="p-5 space-y-3">
                            <div className="flex gap-2">
                                <Skeleton className="h-5 w-16 rounded-full" />
                                <Skeleton className="h-5 w-20 rounded-full" />
                            </div>
                            <Skeleton className="h-6 w-4/5" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-10 w-full rounded-xl mt-2" />
                        </div>
                    </div>
                ))}
        </div>
    );
}