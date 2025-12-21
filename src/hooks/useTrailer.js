import { useState, useEffect } from 'react';
import tmdb from '../services/tmdbApi';

const useTrailer = (movie) => {
    // Support both passing just ID or full movie object
    const movieId = typeof movie === 'object' ? movie?.id : movie;

    const [videoKey, setVideoKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!movieId) {
            setVideoKey(null);
            return;
        }

        const fetchTrailer = async () => {
            setLoading(true);
            try {
                const response = await tmdb.getVideos(movieId);
                const videos = response.data.results || [];

                // Filter for YouTube trailers only
                const trailers = videos.filter(
                    (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
                );

                // Priority: Official trailer first, otherwise just the first one
                const official = trailers.find(t => t.official);
                const selected = official || trailers[0];

                setVideoKey(selected ? selected.key : null);

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

    return {
        videoKey,
        loading,
        error,
        isAvailable: !!videoKey
    };
};

export default useTrailer;
