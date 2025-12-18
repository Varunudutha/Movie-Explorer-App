import React, { useRef } from 'react';
import { Container } from 'react-bootstrap';
import MovieCard from './MovieCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MovieCarousel = ({ title, movies }) => {
    const rowRef = useRef(null);

    const scroll = (offset) => {
        if (rowRef.current) {
            rowRef.current.scrollLeft += offset;
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div className="my-5 position-relative px-4">
            <h3 className="mb-3 text-white fw-bold px-2">{title}</h3>

            <div className="d-flex align-items-center position-relative">
                <button
                    className="btn btn-dark position-absolute start-0 z-3 opacity-50 hover-opacity-100 h-100 d-none d-md-block"
                    style={{ width: '40px', background: 'rgba(0,0,0,0.6)' }}
                    onClick={() => scroll(-500)}
                >
                    <FaChevronLeft />
                </button>

                <div
                    className="d-flex gap-2 overflow-x-auto pb-4 px-2 scrollbar-none"
                    style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
                    ref={rowRef}
                >
                    {movies.map(movie => (
                        <div key={movie.id} style={{ minWidth: '200px', flex: '0 0 auto' }}>
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>

                <button
                    className="btn btn-dark position-absolute end-0 z-3 opacity-50 hover-opacity-100 h-100 d-none d-md-block"
                    style={{ width: '40px', background: 'rgba(0,0,0,0.6)' }}
                    onClick={() => scroll(500)}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default MovieCarousel;
