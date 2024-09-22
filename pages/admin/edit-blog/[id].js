import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditBlog = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const res = await fetch(`/api/blog?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
          setTitle(data.title);
          setContent(data.content);
        } else {
          console.error("Failed to fetch blog post");
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/blog?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert("Blog post updated");
      router.push("/admin");
    } else {
      alert("Failed to update blog post");
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-10 max-w-3xl p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">Edit Blog Post</h1>
      <form onSubmit={handleUpdate} className="flex flex-col space-y-6">
        <label className="text-lg font-semibold">Blog Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="text-lg font-semibold">Blog Content</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          className="h-96 bg-white border border-gray-300 rounded-lg"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
        >
          Update Blog Post
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
