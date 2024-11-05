import React, { useState } from 'react';

const SearchFilter = ({ blogs, setFilteredBlogs }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === '') {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(
        blogs.filter((blog) =>
          blog.title.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchFilter;
