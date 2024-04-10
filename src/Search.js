import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import VideoItem from './VideoItem';
import games from './games'; // Import the games
import './Search.css'; // Import the CSS file

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [selectedVideo, setSelectedVideo] = useState(null);
    
    const history = useHistory();
    const location = useLocation();

    const playerRef = useRef(null); // Add this line

    const [exampleGame] = useState(games[Math.floor(Math.random() * games.length)]); // Select a random game

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
        history.push(`/?q=${encodeURIComponent(query)}&id=${encodeURIComponent(video.id.videoId)}`);
    };

    const handleExampleSearch = () => {
        setQuery(exampleGame);
        history.push(`/?q=${encodeURIComponent(exampleGame)}`);
    };


    const API_KEY = 'AIzaSyB0Hi1KNph95QBxq5LeEKtCl14cAJdw6Ps';

    const handleSearch = (event) => {
        event.preventDefault();
        history.push(`/?q=${encodeURIComponent(query)}`);
    };

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
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=football full match ${debouncedQuery}&key=${API_KEY}&maxResults=10`)
                .then(response => response.json())
                .then(data => {
                    setResults(data.items);
                    const params = new URLSearchParams(location.search);
                    const videoId = params.get('id');
                    const selectedVideo = data.items.find(item => item.id.videoId === videoId);
                    if (selectedVideo) {
                        setSelectedVideo(selectedVideo);
                    }
                });
        }
    }, [debouncedQuery, location.search]);

    // Add this useEffect hook
    useEffect(() => {
        if (selectedVideo && playerRef.current) {
            playerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedVideo]);

    useEffect(() => {
            const params = new URLSearchParams(location.search);
            const q = params.get('q');
        
            if (q) {
                setQuery(q);
            }
        }, [location]);

    return (
        <div className={`search-container ${results.length > 0 ? 'top' : ''}`}>
            <form onSubmit={handleSearch}>
                <input
                    className="search-input"
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Match you want to relive"
                />
            </form>
            {results.length === 0 && (
                <div className="example-search">
                    <span>For example</span>
                    <button onClick={handleExampleSearch}>
                        {exampleGame}
                    </button>
                </div>
            )}
            <div className="video-grid">
                {results.map(result => (
                    <VideoItem key={result.id.videoId} video={result} onVideoSelect={handleVideoSelect} isSelected={selectedVideo.id.videoId === result.id.videoId} />
                ))}
            </div>
            {selectedVideo && (
                <div className="video-player" ref={playerRef}>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1&fs=0&mute=1`}
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