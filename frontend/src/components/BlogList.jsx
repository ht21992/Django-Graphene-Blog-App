import React from "react";

const sampleBlogs = [
  {
    id: 1,
    title: "Getting Started with React",
    content:
      "React is a popular JavaScript library for building user interfaces...",
    createdAt: "2024-10-01 10:00 AM",
  },
  {
    id: 2,
    title: "Exploring JavaScript ES6 Features",
    content:
      "ES6 introduced a host of new features like let, const, arrow functions...",
    createdAt: "2024-10-02 02:30 PM",
  },
  {
    id: 3,
    title: "Understanding Async Programming",
    content:
      "Asynchronous programming is essential for handling network requests...",
    createdAt: "2024-10-03 09:45 AM",
  },
  {
    id: 4,
    title: "A Guide to CSS Flexbox",
    content:
      "CSS Flexbox is a layout model that allows responsive design without using floats or positioning...",
    createdAt: "2024-10-04 11:15 AM",
  },
  {
    id: 5,
    title: "Mastering Git: Essential Commands",
    content:
      "Git is a version control system that helps you track changes in your codebase...",
    createdAt: "2024-10-05 01:20 PM",
  },
  {
    id: 6,
    title: "Demystifying Promises in JavaScript",
    content:
      "Promises are a modern way to handle asynchronous operations in JavaScript...",
    createdAt: "2024-10-06 03:30 PM",
  },
  {
    id: 7,
    title: "Creating RESTful APIs with Express",
    content:
      "Learn how to build RESTful APIs using Express.js, a minimal and flexible Node.js web application framework...",
    createdAt: "2024-10-07 04:50 PM",
  },
  {
    id: 8,
    title: "Web Accessibility: Best Practices",
    content:
      "Making web applications accessible ensures that all users can interact with your content...",
    createdAt: "2024-10-08 09:00 AM",
  },
  {
    id: 9,
    title: "Introduction to TypeScript",
    content:
      "TypeScript is a superset of JavaScript that adds static typing to the language...",
    createdAt: "2024-10-09 10:00 AM",
  },
  {
    id: 10,
    title: "The Basics of Serverless Architecture",
    content:
      "Serverless architecture allows developers to build and run applications without managing servers...",
    createdAt: "2024-10-10 11:30 AM",
  },
];

const BlogList = ({ blogs, setBlog, renderedIds, loading, scrollableRef }) => (
  <div
    id="blogs-list-container"
    className="blog-list-card card"

  >
    <h2>Blog List</h2>
    <div ref={scrollableRef} style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
      {blogs.map((blog) => {
        if (renderedIds.has(blog.id)) {
          return null;
        }
        renderedIds.add(blog.id);
        return (
          <div key={blog.id} className="blog-item">
            <h3 onClick={() => setBlog(blog)} style={{ cursor: "pointer" }}>
              {blog.title}
            </h3>
            <p>{blog.content.substring(0, 80)}...</p>
            <p className="created-at">Created at: {blog.createdAt}</p>
          </div>
        );
      })}
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  </div>
);

export default BlogList;
