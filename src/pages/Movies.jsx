import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import tmdb from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';
import { genres } from '../data/genres';

const Movies = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('query') || '';

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    // Filters
    const [sort, setSort] = useState('popularity.desc');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [year, setYear] = useState('');
    const [language, setLanguage] = useState('');

    const loader = useRef(null);

    // Initial load handling for query param
    useEffect(() => {
        setMovies([]);
        setPage(1);
    }, [queryParam, sort, selectedGenre, year, language]);

    const fetchMovies = useCallback(async () => {
        setLoading(true);
        try {
            let response;
            const params = {
                page,
                sort_by: sort,
                with_genres: selectedGenre || undefined,
                primary_release_year: year || undefined,
                with_original_language: language || undefined,
                include_adult: false
            };

            if (queryParam) {
                response = await tmdb.search(queryParam, params);
            } else {
                // Use discover endpoint for robust filtering
                // Ensure state values map to correct API params
                const discoverParams = {
                    ...params,
                    with_genres: selectedGenre || undefined,
                    primary_release_year: year || undefined,
                    with_original_language: language || undefined,
                    sort_by: sort
                };
                response = await tmdb.discover(discoverParams);
            }

            // Quick fix: If I really want filters to work, I should use discover. 
            // I'll check if I can just use axios here since I imported it in service.
            // I'll use a trick: `tmdb` service instance is exported? No 'tmdb' default is exported.
            // I'll just use the `popular` list which I know works for pagination. 
            // If filters don't work on popular, I'll fix it in Verification.

            // Wait, I can just use the SEARCH endpoint with empty string? No.
            // I'll follow the plan and improve it if needed.

            if (page === 1) {
                setMovies(response.data.results);
            } else {
                setMovies(prev => [...prev, ...response.data.results]);
            }
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error("Error loading movies", error);
        }
        setLoading(false);
    }, [page, queryParam, sort, selectedGenre, year, language]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    // Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 1 }
        );
        if (loader.current) observer.observe(loader.current);
        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [loading]);

    return (
        <Container className="py-4" style={{ marginTop: '80px' }}>
            <h2 className="mb-4 fw-bold">{queryParam ? `Results for "${queryParam}"` : 'Explore Movies'}</h2>

            {/* Filters */}
            <Row className="mb-4 g-2">
                <Col md={3}>
                    <Form.Select className="bg-dark text-white border-secondary" value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
                        <option value="">All Genres</option>
                        {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Control
                        type="number"
                        placeholder="Year"
                        className="bg-dark text-white border-secondary"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Select className="bg-dark text-white border-secondary" value={language} onChange={e => setLanguage(e.target.value)}>
                        <option value="">All Languages</option>
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="ko">Korean</option>
                        {/* Add more as needed */}
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Form.Select className="bg-dark text-white border-secondary" value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="popularity.desc">Most Popular</option>
                        <option value="vote_average.desc">Top Rated</option>
                        <option value="release_date.desc">Newest Releases</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col className="d-flex justify-content-end">
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                            setSelectedGenre('');
                            setYear('');
                            setLanguage('');
                            setSort('popularity.desc');
                            setPage(1);
                        }}
                        disabled={!selectedGenre && !year && !language && sort === 'popularity.desc'}
                    >
                        Reset Filters
                    </Button>
                </Col>
            </Row>

            {/* Grid */}
            <Row>
                {movies.map((movie, idx) => (
                    <Col key={`${movie.id}-${idx}`} xs={6} md={4} lg={3} xl={2} className="mb-4">
                        <MovieCard movie={movie} />
                    </Col>
                ))}

                {movies.length === 0 && !loading && (
                    <div className="text-center py-5">
                        <h4>No movies found. Try adjusting filters.</h4>
                    </div>
                )}

                {loading && Array.from({ length: 12 }).map((_, idx) => (
                    <Col key={`skel-${idx}`} xs={6} md={4} lg={3} xl={2} className="mb-4">
                        <SkeletonCard />
                    </Col>
                ))}
            </Row>

            <div ref={loader} />
        </Container>
    );
};

export default Movies;
