// import dbConnect from "../../lib/dbConnect";
// import Blog from "../../models/Blog";

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === "POST") {
//     const { title, content } = req.body;

//     try {
//       const newBlog = new Blog({ title, content });
//       await newBlog.save();
//       res.status(201).json({ message: "Blog post created" });
//     } catch (error) {
//       res.status(500).json({ message: "Error creating blog post" });
//     }
//   } else if (req.method === "GET") {
//     const { id } = req.query;

//     try {
//       if (id) {
//         // Fetch a specific blog post by ID
//         const blog = await Blog.findById(id);
//         if (!blog) {
//           return res.status(404).json({ message: "Blog post not found" });
//         }
//         return res.status(200).json(blog);
//       } else {
//         // Fetch all blog posts
//         const blogs = await Blog.find({});
//         return res.status(200).json(blogs);
//       }
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching blog posts" });
//     }
//   }
// }

import dbConnect from "../../lib/dbConnect";
import Blog from "../../models/Blog";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { title, content } = req.body;

    try {
      const newBlog = new Blog({ title, content });
      await newBlog.save();
      res.status(201).json({ message: "Blog post created" });
    } catch (error) {
      res.status(500).json({ message: "Error creating blog post" });
    }
  } else if (req.method === "GET") {
    const { id } = req.query;

    try {
      if (id) {
        // Fetch a specific blog post by ID
        const blog = await Blog.findById(id);
        if (!blog) {
          return res.status(404).json({ message: "Blog post not found" });
        }
        return res.status(200).json(blog);
      } else {
        // Fetch all blog posts
        const blogs = await Blog.find({});
        return res.status(200).json(blogs);
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog posts" });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const { title, content } = req.body;

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ message: "Error updating blog post" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.status(204).end(); // No content response
    } catch (error) {
      res.status(500).json({ message: "Error deleting blog post" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
