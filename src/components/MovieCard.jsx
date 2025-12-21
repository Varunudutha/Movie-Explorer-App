import React, { useContext, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { WatchlistContext } from '../context/WatchlistContext';
import { FaPlus, FaCheck, FaInfoCircle, FaPlay } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useTrailer from '../hooks/useTrailer';
import TrailerModal from './TrailerModal';

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

    // Trailer Hook
    const { videoKey, isAvailable } = useTrailer((isHovered || showTrailer) ? movie : null);

    const isInWatchlist = watchlist.some((m) => m.id === id);

    const displayTitle = title || name;

    const posterUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    const handleNavigate = () => {
        navigate(`/movie/${id}`);
    };

    const handleWatchlistClick = (e) => {
        e.stopPropagation();
        toggleWatchlist(movie);
    };

    const handlePlayClick = (e) => {
        e.stopPropagation();
        if (isAvailable) {
            setShowTrailer(true);
        } else {
            navigate(`/movie/${id}`);
        }
    };

    return (
        <>
            <motion.div
                className="theme-card position-relative mx-1"
                style={{ width: '100%', minWidth: '200px', cursor: 'pointer' }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={handleNavigate}
                layout
            >
                {/* Image Container */}
                <div className="ratio ratio-2x3 position-relative">
                    <img
                        src={posterUrl}
                        alt={displayTitle}
                        className="w-100 h-100 object-fit-cover"
                    />
                </div>

                {/* Hover Content */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3"
                            style={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.1))',
                            }}
                        >
                            <h6 className="text-white fw-bold mb-2 small text-truncate">{displayTitle}</h6>

                            {/* Metadata */}
                            <div className="d-flex align-items-center gap-2 mb-3 text-secondary" style={{ fontSize: '0.75rem' }}>
                                <Badge bg={vote_average >= 7 ? "success" : "warning"} className="px-1 text-black">
                                    {vote_average?.toFixed(1)}
                                </Badge>
                                <span className="text-white-50">• {movie.adult ? '18+' : 'PG-13'}</span>
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
                                        <FaPlay size={10} className="text-black" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="rounded-circle p-0 d-flex align-items-center justify-content-center hover-scale border-0"
                                        style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)', color: 'white' }}
                                        onClick={handleWatchlistClick}
                                    >
                                        {isInWatchlist ? <FaCheck className="text-success" size={12} /> : <FaPlus size={12} />}
                                    </Button>
                                </div>
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    className="rounded-circle p-0 d-flex align-items-center justify-content-center border-0"
                                    style={{ width: 32, height: 32, background: 'transparent' }}
                                    onClick={(e) => { e.stopPropagation(); navigate(`/movie/${id}`); }}
                                >
                                    <FaInfoCircle size={18} />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Trailer Modal specific to this card's play button */}
            <TrailerModal
                show={showTrailer}
                onClose={() => setShowTrailer(false)}
                videoKey={videoKey}
            />
        </>
    );
};

export default MovieCard;
