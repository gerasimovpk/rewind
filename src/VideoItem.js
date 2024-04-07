import React from 'react';
import './VideoItem.css'; // Import the CSS file
import { filterTitle } from './utils';

function VideoItem({ video, onVideoSelect }) {
  const handleClick = () => {
    onVideoSelect(video);
  };

  return (
    <div className="video-item" onClick={handleClick}>
      <a target="_blank" rel="noopener noreferrer">
        <div className="thumbnail-container">
            <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
            <div className="thumbnail-blur"></div>
            <div className="play-icon">&#9658;</div>
        </div>
        <h4 dangerouslySetInnerHTML={{ __html: filterTitle(video.snippet.title) }} />
      </a>
    </div>
  );
}

export default VideoItem;