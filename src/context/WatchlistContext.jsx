import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, setDoc, getDoc } from 'firebase/firestore';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);

    // Initial Load & Real-time Sync
    useEffect(() => {
        let unsubscribe;

        const syncWatchlist = async () => {
            if (currentUser) {
                // AUTHENTICATED: Sync with Firestore
                const userRef = doc(db, 'users', currentUser.uid);

                // Check if doc exists (for robustness)
                const docSnap = await getDoc(userRef);
                if (!docSnap.exists()) {
                    await setDoc(userRef, { watchlist: [] }, { merge: true });
                }

                unsubscribe = onSnapshot(userRef, (doc) => {
                    if (doc.exists()) {
                        setWatchlist(doc.data().watchlist || []);
                    }
                    setLoading(false);
                });
            } else {
                // GUEST: Use LocalStorage
                const stored = localStorage.getItem('watchlist');
                if (stored) setWatchlist(JSON.parse(stored));
                setLoading(false);
            }
        };

        syncWatchlist();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [currentUser]);

    // Save to LocalStorage when watchlist changes (only for Guest)
    useEffect(() => {
        if (!currentUser) {
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        }
    }, [watchlist, currentUser]);

    const toggleWatchlist = async (movie) => {
        // Optimistic UI Update (optional, but good for UX)
        // For now, let's rely on the source of truth to avoid desync

        const exists = watchlist.find(m => m.id === movie.id);

        if (currentUser) {
            // AUTHENTICATED: Update Firestore
            const userRef = doc(db, 'users', currentUser.uid);
            try {
                if (exists) {
                    await updateDoc(userRef, {
                        watchlist: arrayRemove(movie)
                    });
                } else {
                    await updateDoc(userRef, {
                        watchlist: arrayUnion(movie)
                    });
                }
            } catch (error) {
                console.error("Error updating watchlist:", error);
            }
        } else {
            // GUEST: Update State directly (LocalStorage effect will catch it)
            setWatchlist(prev => {
                if (exists) {
                    return prev.filter(m => m.id !== movie.id);
                }
                return [...prev, movie];
            });
        }
    };

    const value = React.useMemo(() => ({
        watchlist,
        toggleWatchlist
    }), [watchlist]);

    return (
        <WatchlistContext.Provider value={value}>
            {!loading && children}
        </WatchlistContext.Provider>
    );
};
