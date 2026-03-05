"use client"

import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

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
                    <Card key={post._id}>
                        <div>

                        </div>
                    </Card>
                ))}
            </div>

        </div>
    )
};