import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useTrailer from '../hooks/useTrailer';
import TrailerModal from './TrailerModal';

const HeroBanner = ({ movie }) => {
    const navigate = useNavigate();
    const [showTrailer, setShowTrailer] = useState(false);

    // Always fetch trailer for the hero movie so the button is ready (or check availability)
    const { videoKey } = useTrailer(movie?.id);

    if (!movie) return null;

    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : 'https://via.placeholder.com/1920x800';

    const handlePlay = () => {
        if (videoKey) {
            setShowTrailer(true);
        } else {
            // Fallback to details page if no trailer found
            navigate(`/movie/${movie.id}`);
        }
    };

    return (
        <div
            className="hero-banner w-100 position-relative"
            style={{
                backgroundImage: `url(${backdropUrl})`,
                height: '80vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center top'
            }}
        >
            {/* Gradient Overlays for readability and smooth transition to dark content */}
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, var(--bg-primary) 10%, transparent 90%)' }}></div>
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to right, var(--bg-primary) 0%, transparent 60%)', opacity: 0.9 }}></div>

            <div className="hero-content position-relative h-100 d-flex flex-column justify-content-center px-4 px-md-5" style={{ zIndex: 2, maxWidth: '750px', paddingTop: '80px' }}>
                <h1 className="fw-bold display-3 mb-3 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    {movie.title || movie.name}
                </h1>

                <div className="mb-4 d-flex align-items-center">
                    <span className="text-success fw-bold me-3 border border-success px-2 py-1 rounded small bg-black bg-opacity-50">
                        {Math.round(movie.vote_average * 10)}% Match
                    </span>
                    <span className="text-white me-3 opacity-75">
                        {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}
                    </span>
                    {movie.adult && <span className="border border-secondary text-secondary px-2 py-0 rounded small">18+</span>}
                </div>

                <p className="lead text-white mb-4 d-none d-md-block" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', maxWidth: '600px', fontSize: '1.1rem' }}>
                    {movie.overview?.length > 150 ? movie.overview.slice(0, 150) + '...' : movie.overview}
                </p>

                <div className="d-flex gap-3">
                    <Button
                        variant="light"
                        size="lg"
                        className="px-4 fw-bold d-flex align-items-center gap-2 hover-scale"
                        onClick={handlePlay}
                    >
                        <FaPlay /> Play
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="px-4 fw-bold d-flex align-items-center gap-2 bg-opacity-75 hover-scale"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                        <FaInfoCircle /> More Info
                    </Button>
                </div>
            </div>

            {/* Trailer Modal */}
            <TrailerModal
                videoKey={videoKey}
                show={showTrailer}
                onClose={() => setShowTrailer(false)}
            />
        </div>
    );
};

export default HeroBanner;
