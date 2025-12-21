import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaPaperPlane, FaPenNib } from 'react-icons/fa';
import StarRating from './StarRating';
import { motion } from 'framer-motion';

const ReviewForm = ({ onSave }) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name.trim()) {
            setError('Please enter your name.');
            return;
        }
        if (!reviewText.trim()) {
            setError('Please write a review.');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSave(name, rating, reviewText);
            setName('');
            setRating(5);
            setReviewText('');
            setSuccess('Review posted successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error("ReviewForm submission error:", err);
            setError(err.message || 'Failed to save review.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card-premium p-4 mb-5"
        >
            <div className="d-flex align-items-center gap-2 mb-4 border-bottom border-light border-opacity-10 pb-3">
                <FaPenNib className="text-danger" />
                <h5 className="mb-0 fw-bold">Write a Review</h5>
            </div>

            {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <Alert variant="danger" className="py-2 small">{error}</Alert>
                </motion.div>
            )}
            {success && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <Alert variant="success" className="py-2 small">{success}</Alert>
                </motion.div>
            )}

            <Form onSubmit={handleSubmit}>

                {/* Name Field */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-muted small fw-bold text-uppercase letter-spacing-1">Your Name</Form.Label>
                    <motion.div animate={focusedField === 'name' ? { scale: 1.02 } : { scale: 1 }}>
                        <Form.Control
                            type="text"
                            placeholder="e.g. CinemaLover99"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            maxLength={50}
                            style={{
                                backgroundColor: 'var(--bg-input)',
                                border: focusedField === 'name' ? '1px solid var(--netflix-red)' : '1px solid var(--border-color)',
                                color: 'var(--text-primary)',
                                borderRadius: '8px',
                                padding: '0.8rem'
                            }}
                        />
                    </motion.div>
                </Form.Group>

                {/* Rating Field */}
                <div className="mb-4">
                    <Form.Label className="text-muted small fw-bold text-uppercase letter-spacing-1">Rank this movie</Form.Label>
                    <div className="p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)' }}>
                        <StarRating rating={rating} setRating={setRating} size={36} />
                    </div>
                </div>

                {/* Review Text */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-muted small fw-bold text-uppercase letter-spacing-1">Your thoughts</Form.Label>
                    <motion.div animate={focusedField === 'review' ? { scale: 1.02 } : { scale: 1 }}>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="What made this movie stand out? (Spoilers masked)"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            onFocus={() => setFocusedField('review')}
                            onBlur={() => setFocusedField(null)}
                            maxLength={500}
                            style={{
                                backgroundColor: 'var(--bg-input)',
                                border: focusedField === 'review' ? '1px solid var(--netflix-red)' : '1px solid var(--border-color)',
                                color: 'var(--text-primary)',
                                resize: 'none',
                                fontSize: '1rem',
                                borderRadius: '8px',
                                lineHeight: '1.6',
                                padding: '0.8rem'
                            }}
                        />
                    </motion.div>
                    <div className="d-flex justify-content-between mt-2">
                        <small className="text-muted fst-italic">Express yourself freely</small>
                        <div className="text-muted small opacity-75">
                            {reviewText.length}/500
                        </div>
                    </div>
                </Form.Group>

                {/* Submit Button */}
                <div className="d-flex justify-content-end">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-netflix d-flex align-items-center gap-2 px-5 py-3 fw-bold shadow-lg w-100 justify-content-center"
                        style={{ fontSize: '1.1rem' }}
                    >
                        {isSubmitting ? <Spinner size="sm" /> : <FaPaperPlane />}
                        Post Review
                    </motion.button>
                </div>
            </Form>
        </motion.div>
    );
};

export default ReviewForm;
