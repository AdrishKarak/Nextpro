import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";
import { PostPresence } from "@/components/web/PostPresence";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth-server";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: PostIdRouteProps): Promise<Metadata> {
    const { postid } = await params;
    const post = await fetchQuery(api.posts.getPostById, { postId: postid });
    if (!post) {
        return {
            title: "Post Not Found",
        }
    }
    return {
        title: post.title,
        description: post.body,
        category: "Blogs & Articles",
        keywords: ["Blog", "Articles", "Nextpro"],
        creator: "Adrish",
        publisher: "Adrish",
        authors: [{ name: "Adrish Karak" }]
    }
}

interface PostIdRouteProps {
    params: Promise<{ postid: Id<"posts"> }>
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {
    const { postid } = await params;

    const token = await getToken();

    const [post, preloadComments, userId] = await Promise.all([
        await fetchQuery(api.posts.getPostById, { postId: postid }),
        await preloadQuery(api.comments.getCommentsByPostId, {
            postId: postid
        }),
        await fetchQuery(api.presence.getUserId, {}, { token })
    ])

    if (!userId) {
        return redirect("/auth/login");
    }

    if (!post) {
        return <div>
            <h1 className="text-5xl font-extrabold text-red-500 py-20 text-center">Post Not Found</h1>
        </div>
    }
    return (
        <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
            <Link href="/blog" className={buttonVariants({ variant: "outline", className: "mb-4 hover:bg-pink-200 hover:text-pink-600 transition-all duration-300" })}>
                <ArrowLeft className="size-4" />
                Back to Blog
            </Link>
            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
                <Image src={post.imageUrl ?? "https://images.unsplash.com/photo-1533150783171-ce47d5c2b6ef?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbHBhcGVyJTIwaGR8ZW58MHx8MHx8fDA%3D"} alt="image" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="space-y-4 flex flex-col">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    {post.title}
                </h1>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Posted on: {new Date(post._creationTime).toLocaleDateString()}</p>
                    {userId && <PostPresence roomId={post._id} userId={userId} />}
                </div>

            </div>
            <Separator className="my-8" />
            <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {post.body}
            </p>

            <Separator className="my-8" />
            <CommentSection preloadComments={preloadComments} />
        </div>
    )
}