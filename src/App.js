import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Video from './Video';
import VideoPlayer from './VideoPlayer';
import matches from './matches.json'; // Assuming your matches data is in this file

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/video/:id" component={VideoPlayer} />
        <Route path="/">
          <div>
            {matches.map(match => (
              <Video key={match.id} match={match} />
            ))}
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;