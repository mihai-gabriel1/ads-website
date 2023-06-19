import React from "react";
import { Link } from "@inertiajs/inertia-react";

const PostSummary = ({ post }) => {
    return (
        <div>
            <h2>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{post.excerpt}</p>
        </div>
    );
};

export default PostSummary;
