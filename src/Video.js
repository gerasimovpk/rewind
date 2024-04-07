import React from 'react';
import { Link } from 'react-router-dom';
import './Video.css';

function Video({ match }) {
    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <div key={match.id} className="match">
            <Link to={`/video/${match.id}`} className="thumbnail">
                <img src={match.thumb} alt={match.teams} />
                <div className="play-icon">&#9658;</div>
            </Link>
            <h2>{match.teams}</h2>
            <p>{match.date}</p>
            <p>{match.event}</p>
            <a href={match.youtubeEmbedLink}>Watch Match</a>
            <div className="players">
                {match.players.map(player => (
                    <span key={player} className="player-chip" style={{ backgroundColor: getRandomColor() }}>
                        {player}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Video;