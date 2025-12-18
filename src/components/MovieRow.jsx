import React, { useEffect, useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from './MovieCard';
import { Spinner } from 'react-bootstrap';

const MovieRow = ({ title, fetchFn, isLargeRow, data }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const rowRef = useRef(null);

    useEffect(() => {
        // If data is passed directly, use it (e.g. for Trending which might be pre-fetched)
        if (data) {
            setMovies(data);
            setLoading(false);
            return;
        }

        // Otherwise fetch using the provided function string/method
        const fetchData = async () => {
            if (!fetchFn) return;
            try {
                // Assuming fetchFn is a promise-returning function from tmdbApi
                const request = await fetchFn();
                setMovies(request.data.results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching row: " + title, error);
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchFn, data, title]);

    const handleScroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth / 2
                : scrollLeft + clientWidth / 2;

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (!loading && (!movies || movies.length === 0)) return null;

    return (
        <div className="movie-row my-4 ps-4 position-relative">
            <h4 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
                {title}
                {loading && <Spinner animation="border" size="sm" variant="secondary" />}
            </h4>

            <div className="d-flex align-items-center group">
                {/* Left Arrow */}
                <button
                    className="btn btn-dark position-absolute start-0 z-3 d-none d-md-flex align-items-center justify-content-center h-75 opacity-0 row-arrow"
                    style={{ width: '50px', background: 'rgba(0,0,0,0.5)', border: 'none' }}
                    onClick={() => handleScroll('left')}
                >
                    <FaChevronLeft size={24} />
                </button>

                {/* Container */}
                <div
                    className="d-flex overflow-x-scroll scrollbar-none px-2 py-4"
                    ref={rowRef}
                    style={{
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        gap: '10px',
                        maskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)'
                    }}
                >
                    {movies.map(movie => (
                        // If "isLargeRow" maybe use different card variant or sizing
                        <div key={movie.id} style={{ minWidth: isLargeRow ? '250px' : '200px' }}>
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    className="btn btn-dark position-absolute end-0 z-3 d-none d-md-flex align-items-center justify-content-center h-75 opacity-0 row-arrow"
                    style={{ width: '50px', background: 'rgba(0,0,0,0.5)', border: 'none' }}
                    onClick={() => handleScroll('right')}
                >
                    <FaChevronRight size={24} />
                </button>
            </div>

            <style jsx>{`
                .row-arrow { transition: opacity 0.3s ease; }
                .movie-row:hover .row-arrow { opacity: 1 !important; }
            `}</style>
        </div>
    );
};

export default MovieRow;
