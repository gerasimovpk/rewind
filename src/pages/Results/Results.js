import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import VideoItem from '../../components/VideoItem/VideoItem';
import SearchInput from '../../components/SearchInput/SearchInput';
import YouTubePlayer from '../../components/YoutubePlayer/YouTubePlayer';

import { searchVideos } from '../../api/api';

import './Results.css'; // Import the CSS file

function Results() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const history = useHistory();
    const location = useLocation();

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
        history.push(`?q=${encodeURIComponent(query)}&id=${encodeURIComponent(video.id.videoId)}`);
    };

    const handleSearch = (query) => {
        history.push(`?q=${encodeURIComponent(query)}`);
    };

    // Fetch data when debouncedQuery changes
    useEffect(() => {
        if (query !== '') {
            searchVideos(query)
                .then(data => {
                    setResults(data.items);
                    const params = new URLSearchParams(location.search);
                    
                    const q = params.get('q'); 
                    if (q) {
                        setQuery(q);
                    }
                    
                    const videoId = params.get('id');
                    const selectedVideo = data.items.find(item => item.id.videoId === videoId);
                    if (selectedVideo) {
                        setSelectedVideo(selectedVideo);
                    }
                });
        }
    }, [query, location.search]);

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

    return (
        <div className={`search-container top'`}>
            <div className="results-container">
                <div className="search-section">
                    <Link to="/" className="home-button">Home</Link>
                    <SearchInput initialQuery={query} onSearch={handleSearch} />
                </div>

                <div className="video-grid">
                    {results.map(renderVideoItem)}
                </div>
            </div>

            {selectedVideo && (
                <YouTubePlayer className="youtube-player" videoId={selectedVideo.id.videoId} />
            )}
        </div>
    );
}

export default Results;