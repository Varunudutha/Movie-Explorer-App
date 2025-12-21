import React from 'react';
import { Spinner, Alert, Card, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaHistory, FaFilm } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useUserReviews from '../../hooks/useUserReviews';
import { useAuth } from '../../context/AuthContext';
import StarRating from '../Reviews/StarRating';

const ReviewHistory = () => {
    const { currentUser } = useAuth();
    const { reviews, loading, error } = useUserReviews();

    if (!currentUser) return null; // Or some fallback

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="danger" />
                <p className="mt-2 text-muted small">Loading history...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div className="review-history-section mt-5 fade-in-up">
            <h4 className="mb-4 d-flex align-items-center gap-2 border-start border-4 border-danger ps-3">
                <FaHistory className="text-danger" />
                Your Reviews
                <Badge bg="dark" className="border border-secondary ms-2">{reviews.length}</Badge>
            </h4>

            {reviews.length === 0 ? (
                <div className="text-center py-5 rounded-4 border border-secondary border-opacity-25 bg-dark bg-opacity-25">
                    <FaFilm size={40} className="text-secondary mb-3 opacity-50" />
                    <p className="lead text-secondary">You haven't reviewed any movies yet.</p>
                    <Link to="/" className="btn btn-outline-light btn-sm mt-2">Explore Movies</Link>
                </div>
            ) : (
                <div className="d-flex flex-column gap-3">
                    <AnimatePresence>
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.id + review.movieId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={`/movie/${review.movieId}`}
                                    className="text-decoration-none"
                                >
                                    <Card className="glass-card-premium border-0 h-100 text-white overflow-hidden row flex-row g-0 align-items-center p-2">
                                        {/* Poster Thumbnail */}
                                        <Col xs={3} sm={2} style={{ maxWidth: '80px' }}>
                                            <div className="ratio ratio-2x3 rounded overflow-hidden shadow-sm bg-dark">
                                                {review.moviePoster ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w200${review.moviePoster}`}
                                                        alt={review.movieTitle}
                                                        className="object-fit-cover w-100 h-100"
                                                    />
                                                ) : (
                                                    <div className="d-flex align-items-center justify-content-center h-100 text-muted small">
                                                        <FaFilm />
                                                    </div>
                                                )}
                                            </div>
                                        </Col>

                                        {/* Content */}
                                        <Col className="ps-3 py-2">
                                            <div className="d-flex justify-content-between align-items-start mb-1">
                                                <h6 className="fw-bold mb-0 text-truncate-1 text-light">
                                                    {review.movieTitle || 'Unknown Movie'}
                                                </h6>
                                                <small className="text-muted ms-2" style={{ fontSize: '0.75rem' }}>
                                                    {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                                </small>
                                            </div>

                                            <div className="mb-2">
                                                <StarRating rating={review.rating} readOnly size={12} />
                                            </div>

                                            <p className="text-secondary small mb-0 text-truncate-2" style={{ lineHeight: '1.4' }}>
                                                {review.review}
                                            </p>
                                        </Col>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default ReviewHistory;
