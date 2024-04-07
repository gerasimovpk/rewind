import React, { useState, useEffect, useRef } from 'react';
import VideoItem from './VideoItem';
import './Search.css'; // Import the CSS file

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const playerRef = useRef(null); // Add this line

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    };


    const API_KEY = 'AIzaSyCqnXwQxO9ph5jBLCMGf9vSTg7btQbSRFk';

    // Debounce search query
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500); // 500ms delay

        return () => {
            clearTimeout(timerId);
        };
    }, [query]);

    // Fetch data when debouncedQuery changes
    useEffect(() => {
        if (debouncedQuery) {
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=football full match ${debouncedQuery}&key=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    setResults(data.items);
                });
        }
    }, [debouncedQuery]);

    // Add this useEffect hook
    useEffect(() => {
        if (selectedVideo && playerRef.current) {
            playerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedVideo]);

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for a match"
            />
            <div className="video-grid">
                {results.map(result => (
                    <VideoItem key={result.id.videoId} video={result} onVideoSelect={handleVideoSelect} />
                ))}
            </div>
            {selectedVideo && (
                <div className="video-player" ref={playerRef}>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
}

export default Search;