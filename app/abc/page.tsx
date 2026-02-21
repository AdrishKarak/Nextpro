import Link from "next/link";

export default function AbcPage() {
    return (
        <div>
            <h1>Hello from the abc page</h1>
            <Link href="/abc/hello">Go to abc/hello</Link>
        </div>
    );
}