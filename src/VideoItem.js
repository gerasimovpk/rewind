import React from 'react';
import './VideoItem.css';
import { filterTitle } from './utils';

function VideoItem({ video, onVideoSelect }) {
  const { snippet } = video;

  return (
    <div onClick={() => onVideoSelect(video)} className="video-item">
      <div className="thumbnail-container">
        <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
        <div className="thumbnail-blur"></div>
        <div className="play-icon">&#9658;</div>
      </div>
      <div className="content">
        <h4 dangerouslySetInnerHTML={{ __html: filterTitle(video.snippet.title) }} />
        {/* <div className="description">{snippet.description}</div> */}
      </div>
    </div>
  );
}

export default VideoItem;