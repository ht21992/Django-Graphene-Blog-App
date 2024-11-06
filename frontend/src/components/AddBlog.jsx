import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlogAsync } from "../slices/blogSlice";
const AddBlog = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const dispatch = useDispatch();

  const addBlog = () => {
    if (title && content) {
      setIsCreating(true);
      dispatch(addBlogAsync({ title, content }))
        .then((result) => {
          if (!result.error) {
            setTitle("");
            setContent("");

          }
        })
        .catch((error) => {
          console.error("Error creating blog:", error);
        });
        setIsCreating(false);
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
      <button onClick={addBlog} className="btn add-blog-button" disabled={isCreating}>
        Add Blog
      </button>
    </div>
  );
};

export default AddBlog;
