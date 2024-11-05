import React from 'react';

const BlogStats = ({ blogs }) => (
  <div className="blog-stats">
    <h2>Blog Stats</h2>
    <p>Total Blogs: {blogs.length}</p>
    <p>Average Word Count: {Math.round(
      blogs.reduce((sum, blog) => sum + blog.content.split(' ').length, 0) /
      (blogs.length || 1)
    )}</p>
  </div>
);

export default BlogStats;
