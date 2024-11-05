import React, { useState } from 'react';
import BlogList from './components/BlogList';
import AddBlog from './components/AddBlog';
import BlogDetails from './components/BlogDetails';
import SearchFilter from './components/SearchFilter';
import RecentBlogs from './components/RecentBlogs';
import BlogStats from './components/BlogStats';
import './App.css';

const App = () => {

  const sampleBlogs = [
    {
      id: 1,
      title: 'Getting Started with React',
      content: 'React is a popular JavaScript library for building user interfaces...',
      createdAt: '2024-10-01 10:00 AM',
    },
    {
      id: 2,
      title: 'Exploring JavaScript ES6 Features',
      content: 'ES6 introduced a host of new features like let, const, arrow functions...',
      createdAt: '2024-10-02 02:30 PM',
    },
    {
      id: 3,
      title: 'Understanding Async Programming',
      content: 'Asynchronous programming is essential for handling network requests...',
      createdAt: '2024-10-03 09:45 AM',
    },
    {
      id: 4,
      title: 'A Guide to CSS Flexbox',
      content: 'CSS Flexbox is a layout model that allows responsive design without using floats or positioning...',
      createdAt: '2024-10-04 11:15 AM',
    },
    {
      id: 5,
      title: 'Mastering Git: Essential Commands',
      content: 'Git is a version control system that helps you track changes in your codebase...',
      createdAt: '2024-10-05 01:20 PM',
    },
    {
      id: 6,
      title: 'Demystifying Promises in JavaScript',
      content: 'Promises are a modern way to handle asynchronous operations in JavaScript...',
      createdAt: '2024-10-06 03:30 PM',
    },
    {
      id: 7,
      title: 'Creating RESTful APIs with Express',
      content: 'Learn how to build RESTful APIs using Express.js, a minimal and flexible Node.js web application framework...',
      createdAt: '2024-10-07 04:50 PM',
    },
    {
      id: 8,
      title: 'Web Accessibility: Best Practices',
      content: 'Making web applications accessible ensures that all users can interact with your content...',
      createdAt: '2024-10-08 09:00 AM',
    },
    {
      id: 9,
      title: 'Introduction to TypeScript',
      content: 'TypeScript is a superset of JavaScript that adds static typing to the language...',
      createdAt: '2024-10-09 10:00 AM',
    },
    {
      id: 10,
      title: 'The Basics of Serverless Architecture',
      content: 'Serverless architecture allows developers to build and run applications without managing servers...',
      createdAt: '2024-10-10 11:30 AM',
    },
  ];

  const [blogs, setBlogs] = useState(sampleBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blog,setBlog] = useState({})

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const addBlog = () => {
    if (title && content) {
      const newBlog = {
        id: blogs.length + 1,
        title,
        content,
        createdAt,
        // createdAt: moment().format(),
      };
      setBlogs([newBlog, ...blogs]);
      setTitle('');
      setContent('');
    }
  };


  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1>Interactive Blog Dashboard</h1>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </header>

      <div className="dashboard">
        <div className="card stats-card">
          <h2>Blog Stats</h2>
          <p>Total Blogs: {blogs.length}</p>
          <p>Average Word Count: {Math.round(blogs.reduce((acc, blog) => acc + blog.content.split(' ').length, 0) / blogs.length)}</p>
        </div>

        {!blog.id ? (
          <div className="blog-list-card card">
            <h2>Blog List</h2>
            <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
              {filteredBlogs.map((blog) => (
                <div key={blog.id} className="blog-item">
                  <h3 onClick={() => setBlog(blog)} style={{ cursor: 'pointer' }}>
                    {blog.title}
                  </h3>
                  <p>{blog.content.substring(0, 80)}...</p>
                  <p className="created-at">Created at: {blog.createdAt}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <BlogDetails blog={blog} setBlog={setBlog} />
        )}

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
          <button onClick={addBlog} className="add-blog-button">Add Blog</button>
        </div>
      </div>
    </div>
  );
};

export default App;
