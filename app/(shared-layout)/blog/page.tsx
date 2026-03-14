

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
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
    authors: [{ name: "Adrish Karak" }]

}



export default function BlogPage() {
    return (
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Blogs & Stories</h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Read the latest blogs and stories from our community
                </p>
            </div>

            <Suspense fallback={<SkeletonLoadingUi />}>
                <LoadBlogList />
            </Suspense>
        </div>
    )
};

async function LoadBlogList() {
    await new Promise((resolve) => setTimeout(resolve, 0));
    const data = await fetchQuery(api.posts.getPosts);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {data?.map((post) => (
                <Card key={post._id} className="pt-0">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image src={post.imageUrl ?? "https://images.unsplash.com/photo-1533150783171-ce47d5c2b6ef?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbHBhcGVyJTIwaGR8ZW58MHx8MHx8fDA%3D"} alt="image" width={500} height={500} className="rounded-t-lg object-cover" />
                    </div>

                    <CardContent>
                        <Link href={`/blog/${post._id}`}>
                            <h1 className="text-2xl font-bold hover:text-primary">{post.title}</h1>
                        </Link>
                        <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                    </CardContent>
                    <CardFooter>
                        <Link className={buttonVariants({ className: "w-full" })} href={`/blog/${post._id}`}>Read More <span><ArrowRight /></span></Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

function SkeletonLoadingUi() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[
                ...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <div className="space-y-2 flex flex-col">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>

                ))
            }
        </div>
    )
}