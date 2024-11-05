import React from 'react';

const RecentBlogs = ({ blogs, selectBlog }) => {
  const recentBlogs = blogs.slice(0, 3);

  return (
    <div className="recent-blogs">
      <h2>Recent Blogs</h2>
      {recentBlogs.map((blog) => (
        <div key={blog.id} onClick={() => selectBlog(blog)}>
          <h4>{blog.title}</h4>
          <small>{blog.createdAt}</small>
        </div>
      ))}
    </div>
  );
};

export default RecentBlogs;
