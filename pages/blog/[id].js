import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BlogPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const res = await fetch(`/api/blog?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        } else {
          console.error("Failed to fetch blog post");
        }
      };
      fetchBlog();
    }
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-10 max-w-3xl p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      {/* Render blog content safely */}
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <div className="mt-6">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Blog List
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
