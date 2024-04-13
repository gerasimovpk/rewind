import React, { useEffect, useRef } from 'react';

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
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&fs=1&mute=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;