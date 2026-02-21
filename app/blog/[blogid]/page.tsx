interface BlogidPageProps {
    params: Promise<{ blogid: string }>;
}



export default async function BlogIdPage({ params }: BlogidPageProps) {
    const { blogid } = await params;
    return (
        <div>
            <h1>Hello from the blog [blogid] page</h1>
            <p>Blog ID: {blogid}</p>
        </div>
    );
}