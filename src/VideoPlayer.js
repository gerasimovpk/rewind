import React from 'react';
import { useParams } from 'react-router-dom';
import matches from './matches.json';

function VideoPlayer() {
    const { id } = useParams();
    const match = matches.find(match => match.id === id);

    if (!match) {
        return <div>Video not found</div>;
    }

    return (
        <video controls src={match.videoUrl} />
    );
}

export default VideoPlayer;