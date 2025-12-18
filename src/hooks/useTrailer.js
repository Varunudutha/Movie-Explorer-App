import { useState, useEffect } from 'react';
import tmdb from '../services/tmdbApi';

const useTrailer = (movieId) => {
    const [videoKey, setVideoKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrailer = async () => {
            if (!movieId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await tmdb.getVideos(movieId);
                const videos = response.data.results;

                // Filter for YouTube trailers
                const trailers = videos.filter(
                    (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
                );

                // Priority:
                // 1. Official Trailer (exact match logic or checking name)
                // 2. Any Trailer
                // 3. Fallback to similar clips if trailer not found (optional, but per req we want trailers)
                // We will stick to strict trailer requirement but maybe just pick the best one.

                let selectedTrailer = trailers.find(
                    (vid) => vid.name.toLowerCase().includes('official')
                );

                if (!selectedTrailer && trailers.length > 0) {
                    selectedTrailer = trailers[0]; // Fallback to first available trailer
                }

                setVideoKey(selectedTrailer ? selectedTrailer.key : null);
                setError(null);
            } catch (err) {
                console.error('Error fetching trailer:', err);
                setError(err);
                setVideoKey(null);
            } finally {
                setLoading(false);
            }
        };

        fetchTrailer();
    }, [movieId]);

    return { videoKey, loading, error, isAvailable: !!videoKey };
};

export default useTrailer;
