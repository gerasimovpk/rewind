import React, { useEffect, useRef } from 'react';
import './YouTubePlayer.css';

const YouTubePlayer = ({ videoId }) => {
  const playerRef = useRef();

  useEffect(() => {
    if (videoId && playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [videoId]);

  return (
    <div className="video-player" ref={playerRef}>
      <iframe
        className="video-frame"
        title="video-player"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&fs=1&mute=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;