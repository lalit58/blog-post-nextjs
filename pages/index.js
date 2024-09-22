import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto mt-10 bg-gray-100">
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      <div className="mt-5 space-y-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">{blog.title}</h2>
            <p className="mt-2">
              {blog.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 100)}...
            </p>
            <Link
              href={`/blog/${blog._id}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              See More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
