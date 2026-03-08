"use client"

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
    const data = useQuery(api.posts.getPosts);
    return (
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Blogs & Stories</h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Read the latest blogs and stories from our community
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {data?.map((post) => (
                    <Card key={post._id} className="pt-0">
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image src="" alt="" width={500} height={500} fill className="rounded-t-lg" />
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

        </div>
    )
};