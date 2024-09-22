import { useEffect, useState } from "react";
import Link from "next/link";

const AdminBlogManagement = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/blog");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      } else {
        console.error("Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/blog?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setBlogs(blogs.filter((blog) => blog._id !== id));
      alert("Blog post deleted");
    } else {
      alert("Failed to delete blog post");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Manage Blog Posts</h1>
      <div className="flex flex-wrap gap-6 bg-red">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-pink-100 p-4 border border-pink-200 rounded-lg shadow-md transition-transform transform hover:scale-105 w-full sm:w-1/2 md:w-1/3"
          >
            <h2 className="text-xl font-semibold text-pink-800">
              {blog.title}
            </h2>
            <p className="mt-2 text-gray-700">
              {blog.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 100)}...
            </p>
            <div className="mt-4 flex justify-between">
              <Link
                href={`/blog/${blog._id}`}
                className="text-blue-500 hover:underline"
              >
                Read More
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
              <Link
                href={`/admin/edit-blog/${blog._id}`}
                className="text-green-500 hover:underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogManagement;
