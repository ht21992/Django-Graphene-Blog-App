import React from "react";

const BlogStats = ({ blogs }) => (
  <div className="card stats-card">
    <h2>Blog Stats</h2>
    <p>Total Blogs: {blogs.length}</p>
    <p>
      Average Word Count:{" "}
      {Math.round(
        blogs.reduce((acc, blog) => acc + blog.content.split(" ").length, 0) /
          blogs.length
      )}
    </p>
  </div>
);

export default BlogStats;
