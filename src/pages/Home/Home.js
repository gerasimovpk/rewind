import React, { useState } from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useHistory } from 'react-router-dom';
import './Home.css';

import games from '../../api/games';

function Home() {
  const history = useHistory();

  const [exampleGame] = useState(games[Math.floor(Math.random() * games.length)]);

  const handleSearch = (query) => {
    history.push(`/results?q=${encodeURIComponent(query)}`);
  };

  const handleExampleSearch = () => {
    history.push(`/results?q=${encodeURIComponent(exampleGame)}`);
  };

  return (
    <div className="home-container">
    
      <div className="home-search-input">
        <SearchInput onSearch={handleSearch} />
      </div>

      <section className="example-search">
        <span>For example</span>
  
        <button onClick={handleExampleSearch}>
          {exampleGame}
        </button>
      </section>

    </div>
  );
}

export default Home;