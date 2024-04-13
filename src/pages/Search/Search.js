import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import VideoItem from '../../components/VideoItem/VideoItem';
import SearchInput from '../../components/SearchInput/SearchInput';
import YouTubePlayer from '../../components/YoutubePlayer/YouTubePlayer';

import games from '../../api/games'; // Import the games
import { searchVideos } from '../../api/api';

import './Search.css'; // Import the CSS file

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const history = useHistory();
    const location = useLocation();

    const [exampleGame] = useState(games[Math.floor(Math.random() * games.length)]); // Select a random game

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
        history.push(`/?q=${encodeURIComponent(query)}&id=${encodeURIComponent(video.id.videoId)}`);
    };

    const handleExampleSearch = () => {
        setQuery(exampleGame);
        history.push(`/?q=${encodeURIComponent(exampleGame)}`);
    };

    const handleSearch = (query) => {
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
            searchVideos(debouncedQuery)
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

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q');

        if (q) {
            setQuery(q);
        }
    }, [location]);

    // Extracted function
    const renderVideoItem = (result) => {
        const { videoId } = result.id;
        return (
            <VideoItem
                key={videoId}
                video={result}
                onVideoSelect={handleVideoSelect}
                isSelected={selectedVideo?.id?.videoId === videoId}
            />
        );
    };

    const hasResults = () => {
        return results.length === 0;
    }

    return (
        <div className={`search-container ${results.length > 0 ? 'top' : ''}`}>
            <SearchInput onSearch={handleSearch} />

            {hasResults() && (
                <section className="example-search">
                    <span>For example</span>
                    <button onClick={handleExampleSearch}>
                        {exampleGame}
                    </button>
                </section>
            )}
            <div className="video-grid">
                {results.map(renderVideoItem)}
            </div>
            {selectedVideo && (
                <YouTubePlayer videoId={selectedVideo.id.videoId} />
            )}
        </div>
    );
}

export default Search;