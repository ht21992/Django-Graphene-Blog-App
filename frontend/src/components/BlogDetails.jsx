import React from 'react';

const BlogDetails = ({ blog, setBlog }) => (
  <div className="blog-details">
    <button className="btn back-button" onClick={()=>setBlog({})}>Back</button>
    <h2>{blog.title}</h2>
    <p>{blog.content}</p>
    <small>Created at: {blog.createdAt}</small>
  </div>
);

export default BlogDetails;
