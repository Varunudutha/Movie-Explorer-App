import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Spinner } from 'react-bootstrap';

const TrailerPlayer = ({ videoKey }) => {
    const [loading, setLoading] = useState(true);

    if (!videoKey) return null;

    const embedUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0&rel=0&modestbranding=1&origin=${window.location.origin}`;

    return (
        <div className="w-100 h-100 position-relative bg-black">
            {loading && (
                <div className="position-absolute top-50 start-50 translate-middle text-white text-center z-1">
                    <Spinner animation="border" role="status" variant="danger" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            <iframe
                src={embedUrl}
                title="Trailer"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setLoading(false)}
                className="w-100 h-100"
                style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}
            ></iframe>
        </div>
    );
};

export default TrailerPlayer;
