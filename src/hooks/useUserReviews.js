import { useState, useEffect } from 'react';
import {
    collectionGroup,
    query,
    where,
    onSnapshot,
    getDocs // fallback if snapshot fails for permissions
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

/**
 * Hook to fetch all reviews written by the current user across ALL movies.
 * Uses Collection Group Query: db.collectionGroup('user_reviews')
 */
const useUserReviews = () => {
    const { currentUser } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            setReviews([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        // Query all 'user_reviews' collections where userId matches
        const q = query(
            collectionGroup(db, 'user_reviews'),
            where('userId', '==', currentUser.uid)
        );

        // Using onSnapshot for real-time updates
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetched = [];
            snapshot.forEach(doc => {
                fetched.push({ id: doc.id, ...doc.data() });
            });

            // Client-side sort by createdAt (Newest First)
            // We do this to avoid needing a Composite Index (userId + createdAt)
            fetched.sort((a, b) => {
                const timeA = a.createdAt?.toMillis() || 0;
                const timeB = b.createdAt?.toMillis() || 0;
                return timeB - timeA;
            });

            setReviews(fetched);
            setLoading(false);
        }, (err) => {
            console.error("[useUserReviews] Error:", err);
            // Show exact error (crucial for Index creation links or permission details)
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    return { reviews, loading, error };
};

export default useUserReviews;
