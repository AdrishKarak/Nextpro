import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";
import { PostPresence } from "@/components/web/PostPresence";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth-server";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: PostIdRouteProps): Promise<Metadata> {
    const { postid } = await params;
    const post = await fetchQuery(api.posts.getPostById, { postId: postid });
    if (!post) return { title: "Post Not Found" };
    return {
        title: post.title,
        description: post.body,
        category: "Blogs & Articles",
        keywords: ["Blog", "Articles", "Nextpro"],
        creator: "Adrish",
        publisher: "Adrish",
        authors: [{ name: "Adrish Karak" }],
    };
}

interface PostIdRouteProps {
    params: Promise<{ postid: Id<"posts"> }>;
}

// rough read-time estimate
function readTime(text: string) {
    return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {
    const { postid } = await params;
    const token = await getToken();

    const [post, preloadComments, userId] = await Promise.all([
        fetchQuery(api.posts.getPostById, { postId: postid }),
        preloadQuery(api.comments.getCommentsByPostId, { postId: postid }),
        fetchQuery(api.presence.getUserId, {}, { token }),
    ]);

    if (!userId) return redirect("/auth/login");

    if (!post) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(244,63,94,0.1)", border: "1.5px solid rgba(244,63,94,0.25)" }}
                >
                    <BookOpen size={28} style={{ color: "#f43f5e" }} />
                </div>
                <h1 className="text-3xl font-extrabold" style={{ color: "#f43f5e" }}>Post not found</h1>
                <p className="text-muted-foreground">This post may have been removed or never existed.</p>
                <Link
                    href="/blog"
                    className={buttonVariants({ variant: "outline" })}
                    style={{ borderColor: "rgba(244,63,94,0.3)", color: "#f43f5e" }}
                >
                    <ArrowLeft size={14} className="mr-1.5" /> Back to Blog
                </Link>
            </div>
        );
    }

    const mins = readTime(post.body);

    return (
        <div className="min-h-screen">

            {/* ── Back button strip ───────────────────────────────────────────────── */}
            <div className="max-w-3xl mx-auto px-4 pt-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:opacity-70"
                    style={{ color: "#f43f5e" }}
                >
                    <ArrowLeft size={15} />
                    Back to Blog
                </Link>
            </div>

            {/* ── Hero image ──────────────────────────────────────────────────────── */}
            <div className="max-w-3xl mx-auto px-4 mt-6">
                <div className="relative w-full h-[420px] rounded-2xl overflow-hidden"
                    style={{ border: "1.5px solid rgba(244,63,94,0.15)" }}>
                    <Image
                        src={post.imageUrl ?? "https://images.unsplash.com/photo-1533150783171-ce47d5c2b6ef?fm=jpg&q=60&w=3000&auto=format&fit=crop"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        priority
                    />
                    {/* Gradient overlay so title pops if added later */}
                    <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)" }} />
                </div>
            </div>

            {/* ── Article content ─────────────────────────────────────────────────── */}
            <article className="max-w-3xl mx-auto px-4 mt-10 pb-20">

                {/* Tag + presence row */}
                <div className="flex items-center justify-between mb-5">
                    <span
                        className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                        style={{ background: "rgba(244,63,94,0.1)", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.2)" }}
                    >
                        Article
                    </span>
                    {userId && <PostPresence roomId={post._id} userId={userId} />}
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6"
                    style={{ color: "hsl(var(--foreground))" }}>
                    {post.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar size={13} style={{ color: "#f43f5e" }} />
                        {new Date(post._creationTime).toLocaleDateString("en-US", {
                            year: "numeric", month: "long", day: "numeric",
                        })}
                    </span>
                    <span
                        className="w-1 h-1 rounded-full bg-muted-foreground opacity-40"
                    />
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock size={13} style={{ color: "#f43f5e" }} />
                        {mins} min read
                    </span>
                </div>

                {/* Decorative rose rule */}
                <div className="h-px w-full mb-8"
                    style={{ background: "linear-gradient(90deg, #f43f5e 0%, rgba(244,63,94,0.1) 60%, transparent 100%)" }} />

                {/* Body */}
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="text-lg leading-[1.85] whitespace-pre-wrap"
                        style={{ color: "hsl(var(--foreground) / 0.88)" }}>
                        {post.body}
                    </p>
                </div>

                {/* Bottom rule */}
                <div className="h-px w-full mt-12 mb-10"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(244,63,94,0.25) 50%, transparent 100%)" }} />

                {/* Comments */}
                <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2"
                        style={{ color: "hsl(var(--foreground))" }}>
                        <span className="w-1 h-5 rounded-full" style={{ background: "#f43f5e" }} />
                        Comments
                    </h2>
                    <CommentSection preloadComments={preloadComments} />
                </div>
            </article>
        </div>
    );
}