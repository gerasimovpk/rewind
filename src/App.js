import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Search from './Search';

function App() {
  return (
    <Router>
      <Search />
    </Router>
  );
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);

export default App;