import { useState, useEffect, useMemo } from 'react';
import {
    collection,
    doc,
    setDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const REVIEWS_DEBUG = true;

/**
 * Custom hook to manage reviews for a specific movie.
 * Firestore Structure: reviews/{movieId}/user_reviews/{autoId}
 * OPEN SUBMISSION MODE: No Auth Required.
 */
const useMovieReviews = (movieId) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'highest', 'lowest'

    const log = (msg, data = '') => {
        if (REVIEWS_DEBUG) console.log(`[Reviews][${movieId}] ${msg}`, data);
    };

    // Subscribe to reviews
    useEffect(() => {
        if (!movieId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const reviewsRef = collection(db, 'reviews', movieId.toString(), 'user_reviews');
        const q = query(reviewsRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            log('Snapshot update', snapshot.size);
            const fetchedReviews = [];

            snapshot.forEach((doc) => {
                const data = doc.data();
                const review = { id: doc.id, ...data };
                fetchedReviews.push(review);
            });

            setReviews(fetchedReviews);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching reviews:", err);
            setError("Failed to load reviews.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [movieId]);

    // Derived Stats
    const stats = useMemo(() => {
        if (reviews.length === 0) return { average: 0, total: 0 };

        const total = reviews.length;
        const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
        const average = (sum / total).toFixed(1);

        return { average, total };
    }, [reviews]);

    // Sorted Reviews
    const sortedReviews = useMemo(() => {
        let sorted = [...reviews];
        switch (sortBy) {
            case 'highest':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'lowest':
                sorted.sort((a, b) => a.rating - b.rating);
                break;
            case 'oldest':
                sorted.sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0));
                break;
            case 'newest':
            default:
                sorted.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
                break;
        }
        return sorted;
    }, [reviews, sortBy]);


    const { currentUser } = useAuth(); // Access auth state (optional)

    // Generate or retrieve a persistent Visitor ID for this device
    const getVisitorId = () => {
        let vid = localStorage.getItem('movie_explorer_visitor_id');
        if (!vid) {
            vid = 'visitor_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
            localStorage.setItem('movie_explorer_visitor_id', vid);
        }
        return vid;
    };

    // Add or Update Open Review (Enforces One Per Visitor OR Per User)
    const saveReview = async (name, rating, text, movieData = {}) => {
        try {
            setError(null);

            if (!movieId) {
                console.error("[Reviews] Missing Movie ID");
                setError("Review failed: Invalid movie ID.");
                return false;
            }

            // HYBRID IDENTITY LOGIC:
            // 1. If Logged In -> Use User UID (Unique to Account)
            // 2. If Guest -> Use Visitor ID (Unique to Device)
            const visitorId = getVisitorId();
            const uniqueId = currentUser ? currentUser.uid : visitorId;

            if (!uniqueId) {
                console.error("[Reviews] Failed to establish identity");
                setError("Review failed: Could not establish identity.");
                return false;
            }

            const reviewId = uniqueId;

            const reviewData = {
                id: reviewId,
                userName: name.trim() || (currentUser?.displayName || 'Anonymous'),
                userPhoto: currentUser?.photoURL || null,
                rating: Number(rating),
                review: text.trim().slice(0, 300),
                visitorId: visitorId,
                userId: currentUser ? currentUser.uid : null,
                movieId: movieId.toString(),

                // NEW: Store Movie Metadata for Profile History
                movieTitle: movieData.title || 'Unknown Title',
                moviePoster: movieData.poster_path || null,

                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            log('Saving review', reviewData);

            const reviewDocRef = doc(db, 'reviews', movieId.toString(), 'user_reviews', reviewId);
            await setDoc(reviewDocRef, reviewData, { merge: true });

            log('Review saved successfully');
            return true;

        } catch (err) {
            console.error("Error saving review:", err);

            // Handle specific Firestore errors and THROW friendly message
            let friendlyMsg = "Failed to save review.";
            if (err.code === 'permission-denied') {
                friendlyMsg = "Permission Error: Check Firestore Rules (See Console).";
            } else if (err.code === 'unavailable') {
                friendlyMsg = "Network Error: Firestore unreachable.";
            } else {
                friendlyMsg = err.message || "Unknown Error";
            }

            setError(friendlyMsg);
            throw new Error(friendlyMsg);
        }
    };

    // Deletion removed for Open Mode (No auth to verify ownership)

    return {
        reviews: sortedReviews,
        allReviews: reviews,
        loading,
        error,
        saveReview,
        stats,
        sortBy,
        setSortBy
    };
};

export default useMovieReviews;
