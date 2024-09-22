import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import AdminBlogManagement from "./manage-blogs";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      setTitle("");
      setContent("");
      alert("Blog post created");
    } else {
      alert("Failed to create blog post");
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-3xl p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8">
        Add a New Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        {/* Blog Title */}
        <label className="text-lg font-semibold">Blog Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter blog title"
        />

        {/* Blog Content */}
        <label className="text-lg font-semibold">Blog Content</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          className="h-96 bg-white border border-gray-300 rounded-lg"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
        >
          Submit Blog Post
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
