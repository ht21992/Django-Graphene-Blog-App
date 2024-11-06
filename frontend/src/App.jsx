import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import AddBlog from "./components/AddBlog";
import BlogDetails from "./components/BlogDetails";
import BlogStats from "./components/BlogStats";
import CSRFToken from "./components/CSRFToken";
import axios from "axios";
import Cookies from "js-cookie";
import "./App.css";

const App = () => {
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const renderedIds = new Set();
  const scrollableRef = useRef(null);

  const fetchBlogs = async (currentOffset) => {
    setLoading(true);

    const graphqlQuery = {
      query: `
              query GetAllPosts($limit: Int, $offset: Int) {
                  allPosts(limit: $limit, offset: $offset) {
                    id
                    title
                    content
                    createdAt
                  }
              }
          `,
      variables: {
        limit: 5,
        offset: currentOffset,
      },
    };

    try {
      const response = await axios.post("/graphql/", graphqlQuery, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      // console.log(response.data);
      const fetchedBlogs = response.data.data.allPosts;
      setBlogs((pervBlgos) => [...pervBlgos, ...fetchedBlogs]);

      setOffset((prevOffset) => prevOffset + fetchedBlogs.length);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const [blogs, setBlogs] = useState([]);
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
        setLoading(true);
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
      <CSRFToken />
      <header className="header">
        {/* <h1>Interactive Blog Dashboard</h1> */}
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
          />
        ) : (
          <BlogDetails blog={blog} setBlog={setBlog} />
        )}
        <AddBlog blogs={blogs} setBlogs={setBlogs} />
      </div>
    </div>
  );
};

export default App;
