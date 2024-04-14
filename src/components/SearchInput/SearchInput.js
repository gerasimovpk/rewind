import React, { useState, useEffect } from 'react';
import './SearchInput.css';

const SearchInput = ({ initialQuery, onSearch }) => {
  const [query, setQuery] = useState(initialQuery || '');

  useEffect(() => {
    setQuery(initialQuery || '');
  }, [initialQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className='search-input' onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="What match are you looking for?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchInput;