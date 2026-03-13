import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostIdRouteProps {
    params: Promise<{ postid: Id<"posts"> }>
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {
    const { postid } = await params;
    const post = await fetchQuery(api.posts.getPostById, { postId: postid });
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
                <p className="text-sm text-muted-foreground">Posted on: {new Date(post._creationTime).toLocaleDateString()}</p>
            </div>
            <Separator className="my-8" />
            <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {post.body}
            </p>

            <Separator className="my-8" />
            <CommentSection />
        </div>
    )
}