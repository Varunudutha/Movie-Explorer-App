import React, { useContext, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { WatchlistContext } from '../context/WatchlistContext';
import { FaPlus, FaCheck, FaInfoCircle, FaPlay } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useTrailer from '../hooks/useTrailer';
import TrailerPlayer from './TrailerPlayer';

const MovieCard = ({ movie }) => {
    const {
        poster_path,
        backdrop_path,
        title,
        name,
        vote_average,
        id,
        overview,
        genre_ids
    } = movie;

    const navigate = useNavigate();
    const { toggleWatchlist, watchlist } = useContext(WatchlistContext);
    const [isHovered, setIsHovered] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);

    // Trailer Hook (only fetch if hovered likely or on click for optimisation? 
    // Actually for 'Play' button availability we might want it, but let's just assume play works or fails gracefully)
    // To make it super fast, we can fetch on hover.
    const { videoKey } = useTrailer(isHovered ? id : null);

    const isInWatchlist = watchlist.some((m) => m.id === id);

    const displayTitle = title || name;

    // Images
    const posterUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    const backdropUrl = backdrop_path
        ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
        : posterUrl; // Fallback to poster if backdrops missing

    const handleNavigate = () => {
        navigate(`/movie/${id}`);
    };

    const handleWatchlistClick = (e) => {
        e.stopPropagation();
        toggleWatchlist(movie);
    };

    const handlePlayClick = (e) => {
        e.stopPropagation();
        if (videoKey) {
            setShowTrailer(true);
        } else {
            // If no trailer immediately, maybe navigate or just show info
            navigate(`/movie/${id}`);
        }
    };

    // Variants for animation
    const cardVariants = {
        idle: { scale: 1, zIndex: 1 },
        hover: {
            scale: 1.4,
            zIndex: 10,
            transition: { duration: 0.3, delay: 0.4 } // Delay to prevent accidental triggers
        }
    };

    return (
        <>
            <motion.div
                className="movie-card position-relative bg-dark rounded-2 overflow-hidden mx-1"
                style={{ width: '100%', minWidth: '200px', cursor: 'pointer', transformOrigin: 'center center' }}
                initial="idle"
                whileHover="hover"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                variants={cardVariants}
                onClick={handleNavigate}
            >
                {/* Image Container - Swaps to backdrop on hover for "Netflix" feel if desired, 
                    but sticking to poster for smooth consistency often works better unless we expand wide. 
                    Let's keep poster but maybe darken it. */}
                <div className="ratio ratio-2x3 position-relative">
                    <img
                        src={posterUrl}
                        alt={displayTitle}
                        className="w-100 h-100 object-fit-cover rounded-2"
                    />
                </div>

                {/* Hover Content */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3"
                            style={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.4) 60%, transparent)',
                                boxShadow: '0 4px 30px rgba(0,0,0,0.5)'
                            }}
                        >
                            <h6 className="text-white fw-bold mb-2 small text-truncate">{displayTitle}</h6>

                            {/* Metadata */}
                            <div className="d-flex align-items-center gap-2 mb-3 text-secondary" style={{ fontSize: '0.75rem' }}>
                                <Badge bg={vote_average >= 7 ? "success" : "warning"} className="px-1 text-black">
                                    {vote_average?.toFixed(1)}
                                </Badge>
                                <span>• {movie.adult ? '18+' : 'PG-13'}</span>
                                {/* We could map genres if we had the list, skipping for brevity/perf */}
                            </div>

                            {/* Action Buttons Row */}
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex gap-2">
                                    <Button
                                        variant="light"
                                        size="sm"
                                        className="rounded-circle p-0 d-flex align-items-center justify-content-center hover-scale"
                                        style={{ width: 32, height: 32 }}
                                        onClick={handlePlayClick}
                                    >
                                        <FaPlay size={12} />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="rounded-circle p-0 d-flex align-items-center justify-content-center hover-scale border-0"
                                        style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)' }}
                                        onClick={handleWatchlistClick}
                                    >
                                        {isInWatchlist ? <FaCheck className="text-success" size={12} /> : <FaPlus size={12} />}
                                    </Button>
                                </div>
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    className="rounded-circle p-0 d-flex align-items-center justify-content-center border-0"
                                    style={{ width: 32, height: 32 }}
                                    onClick={(e) => { e.stopPropagation(); navigate(`/movie/${id}`); }}
                                >
                                    <FaInfoCircle size={16} />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Trailer Modal specific to this card's play button */}
            <TrailerPlayer
                videoKey={videoKey}
                show={showTrailer}
                onClose={() => setShowTrailer(false)}
            />
        </>
    );
};

export default MovieCard;
