import React, { useState } from "react";

const AddBlog = ({blogs, setBlogs}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addBlog = () => {
    if (title && content) {
      const newBlog = {
        id: blogs.length + 1,
        title,
        content,
        createdAt: "2024-10-10 11:30 AM",
        // createdAt: moment().format(),
      };
      setBlogs([newBlog, ...blogs]);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="card add-blog-card">
      <h2>Add New Blog</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="input-field"
      ></textarea>
      <button onClick={addBlog} className="btn add-blog-button">
        Add Blog
      </button>
    </div>
  );
};

export default AddBlog;
