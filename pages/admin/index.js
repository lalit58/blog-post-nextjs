// pages/admin/index.js

import AdminBlogManagement from "./manage-blogs";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Link
          href="/admin/add-blog"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Blog
        </Link>
      </div>
      <AdminBlogManagement />
    </div>
  );
};

export default AdminDashboard;
