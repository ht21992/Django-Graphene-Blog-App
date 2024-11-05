import React from 'react';

const BlogList = ({ blogs, selectBlog }) => (
  <div className="blog-list">
    <h2>Blog List</h2>
    {blogs.map((blog) => (
      <div key={blog.id} onClick={() => selectBlog(blog)} className="blog-item">
        <h3>{blog.title}</h3>
        <p>{blog.content.slice(0, 50)}...</p>
        <small>Created at: {blog.createdAt}</small>
      </div>
    ))}
  </div>
);

export default BlogList;
