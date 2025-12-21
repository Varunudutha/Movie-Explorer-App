import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import StarRating from './StarRating';
import { FaQuoteLeft, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to get initials
const getInitials = (name) => {
    if (!name) return '?';
    return name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
};

// Random gradient for avatars
const getRandomGradient = (name) => {
    const gradients = [
        'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)', // Pink/Red
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Blue/Cyan
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Green/Teal
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // Orange/Yellow
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple
    ];
    const index = name.length % gradients.length;
    return gradients[index];
};

const ReviewCard = ({ review, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLong = review.review && review.review.length > 200;

    // Date Formatting
    const dateStr = review.createdAt?.toDate
        ? review.createdAt.toDate().toLocaleDateString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric'
        })
        : 'Just now';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            className="glass-card-premium mb-4 p-4"
        >
            {/* Visual Depth Icon */}
            <FaQuoteLeft
                className="position-absolute opacity-10"
                size={120}
                style={{ top: -20, right: 10, color: 'var(--text-secondary)', transform: 'rotate(10deg)', pointerEvents: 'none' }}
            />

            <div className="d-flex gap-4 position-relative" style={{ zIndex: 1 }}>

                {/* User Identity Column */}
                <div className="d-flex flex-column align-items-center gap-2">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="rounded-circle shadow-lg d-flex align-items-center justify-content-center"
                        style={{
                            width: '64px',
                            height: '64px',
                            background: getRandomGradient(review.userName || 'User'),
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            color: '#fff',
                            border: '3px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {getInitials(review.userName)}
                    </motion.div>

                </div>

                {/* Content Column */}
                <div className="flex-grow-1">
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                        <div>
                            <h5 className="fw-bold mb-0 text-primary d-flex align-items-center gap-2">
                                {review.userName}
                                {/* Mock Verified Badge for effect */}
                                <FaCheckCircle size={14} className="text-info opacity-75" title="Verified Reviewer" />
                            </h5>
                            <span className="text-muted small text-uppercase letter-spacing-1" style={{ fontSize: '0.75rem' }}>
                                {dateStr}
                            </span>
                        </div>
                        <div className="bg-dark bg-opacity-50 px-3 py-1 rounded-pill border border-secondary border-opacity-25">
                            <StarRating rating={review.rating} readOnly size={14} />
                        </div>
                    </div>

                    <div className="mt-3">
                        <motion.div
                            layout
                            className="text-cinematic text-secondary position-relative"
                            style={{ fontSize: '1.05rem' }}
                        >
                            {isExpanded ? review.review : (review.review?.slice(0, 200) || "")}
                            {isLong && !isExpanded && "..."}
                        </motion.div>

                        {isLong && (
                            <motion.button
                                whileHover={{ scale: 1.05, color: 'var(--netflix-red)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="btn btn-link p-0 mt-2 text-decoration-none text-muted fw-bold small"
                            >
                                {isExpanded ? 'Show Less' : 'Read Full Review'}
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-secondary py-5 glass-card-premium"
            >
                <div className="mb-3 opacity-25">
                    <FaQuoteLeft size={50} />
                </div>
                <p className="lead fw-light">No reviews yet.</p>
                <p className="small text-muted">Be the first voice of the community!</p>
            </motion.div>
        );
    }

    return (
        <div className="d-flex flex-column gap-2">
            <AnimatePresence>
                {reviews.map((review, index) => (
                    <ReviewCard key={review.id} review={review} index={index} />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ReviewList;
