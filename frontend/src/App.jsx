import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogsAsync } from "./slices/blogSlice";
import BlogList from "./components/BlogList";
import AddBlog from "./components/AddBlog";
import BlogDetails from "./components/BlogDetails";
import BlogStats from "./components/BlogStats";
import CSRFToken from "./components/CSRFToken";
import BlogSubscription from "./BlogSubscription";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { blogs, loading, maxBlogsLength } = useSelector((state) => state.blog);
  const [offset, setOffset] = useState(0);
  const [blogsFlag, setBlogsFlag] = useState(false)
  const renderedIds = new Set();
  const scrollableRef = useRef(null);

  const fetchBlogs = (currentOffset) => {
    if (maxBlogsLength && maxBlogsLength < currentOffset ) {
      setBlogsFlag(true);
      return;
    }
    dispatch(fetchBlogsAsync(currentOffset));
    setOffset((prevOffset) => prevOffset + 5);

  };

  const [searchTerm, setSearchTerm] = useState("");
  const [blog, setBlog] = useState({});

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchBlogs(0);
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (
        scrollableRef.current.scrollTop + scrollableRef.current.clientHeight >=
          scrollableRef.current.scrollHeight &&
        !loading
      ) {

        fetchBlogs(offset);
      }
    };

    const scrollableContainer = scrollableRef.current;
    scrollableContainer.addEventListener("scroll", handleScroll);

    return () => scrollableContainer.removeEventListener("scroll", handleScroll);
  }, [offset, loading]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <BlogSubscription />
      <CSRFToken />
      <header className="header">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </header>

      <div className="dashboard">
        <BlogStats blogs={blogs} />
        {!blog.id ? (
          <BlogList
          blogs={filteredBlogs}
          setBlog={setBlog}
          renderedIds={renderedIds}
          loading={loading}
          scrollableRef={scrollableRef}
          blogsFlag={blogsFlag}

        />
        ) : (
          <BlogDetails blog={blog} setBlog={setBlog} />
        )}
        <AddBlog blogs={blogs} />
      </div>
    </div>
  );
};

export default App;