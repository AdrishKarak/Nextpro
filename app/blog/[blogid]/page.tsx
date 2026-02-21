interface BlogidPageProps {
    params: {
        blogid: string;
    };
}



export default function BlogIdPage({ params }: BlogidPageProps) {
    return (
        <div>
            <h1>Hello from the blog [blogid] page</h1>
            <p>Blog ID: {params.blogid}</p>
        </div>
    );
}