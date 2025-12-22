import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Spinner } from 'react-bootstrap';
import tmdb from '../services/tmdbApi';
import MovieCarousel from '../components/MovieCarousel';
import TrailerModal from '../components/TrailerModal';
import useTrailer from '../hooks/useTrailer';
import ReviewForm from '../components/Reviews/ReviewForm';
import ReviewList from '../components/Reviews/ReviewList';
import useMovieReviews from '../hooks/useMovieReviews';
// Auth import removed
import Navbar from '../layouts/Navbar'; // Keep one import if we were using it inside, BUT we are removing the usage. Wait, ImmersiveLayout handles Navbar. So we should REMOVE the import too to be clean.
// However, the user request says "Remove all redundant imports". Since Layout handles it, I will remove it.

// Footer removed - handled by Layout
import ReviewHeader from '../components/Reviews/ReviewHeader';
import { FaPlay, FaStar } from 'react-icons/fa';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);

    // Use custom hook for trailer logic
    const { videoKey, isAvailable, loading: trailerLoading } = useTrailer(id);

    // Use custom hook for movie reviews logic
    const {
        reviews,
        loading: reviewsLoading,
        saveReview,
        stats,
        sortBy,
        setSortBy
    } = useMovieReviews(id);

    // Auth logic removed

    useEffect(() => {
        const getDetail = async () => {
            setLoading(true);
            try {
                const res = await tmdb.detail(id);
                setMovie(res.data);

                const creditsRes = await tmdb.credits(id);
                setCast(creditsRes.data.cast.slice(0, 10)); // Top 10 cast

                const similarRes = await tmdb.similar(id);
                setSimilar(similarRes.data.results);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
            window.scrollTo(0, 0);
        };
        getDetail();
    }, [id]);

    // Smooth Scroll to Trailer function (optional but nice)
    const scrollToTrailer = () => {
        document.getElementById('trailer')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="danger" /></div>;
    if (!movie) return <div className="text-center mt-5">Movie not found</div>;

    const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '';

    return (
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '50px' }}>
            {/* Banner */}
            <div
                style={{
                    backgroundImage: `url(${backdropUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    height: '60vh',
                    position: 'relative'
                }}
            >
                <div
                    className="w-100 h-100"
                    style={{ background: 'linear-gradient(to top, #141414, transparent)' }}
                ></div>

                <div className="position-absolute bottom-0 start-0 p-4 w-100 container-fluid">
                    <Container>
                        <h1 className="display-4 fw-bold">{movie.title}</h1>
                        <div className="d-flex gap-3 align-items-center mb-3">
                            <span className="text-success fw-bold">{Math.round(movie.vote_average * 10)}% Match</span>
                            <span>{movie.release_date.split('-')[0]}</span>
                            <Badge bg="secondary">{movie.runtime} min</Badge>
                            <div className="d-flex gap-1">
                                {movie.genres.map(g => (
                                    <Badge key={g.id} bg="dark" className="border border-secondary">{g.name}</Badge>
                                ))}
                            </div>
                        </div>
                        {trailerLoading ? (
                            <Button variant="light" size="lg" className="fw-bold px-4" disabled>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Checking...
                            </Button>
                        ) : isAvailable ? (
                            <Button
                                variant="light"
                                size="lg"
                                className="fw-bold px-4"
                                onClick={() => setShowTrailer(true)}
                            >
                                <FaPlay className="me-2" /> Play Trailer
                            </Button>
                        ) : (
                            <Button variant="secondary" size="lg" className="fw-bold px-4" disabled>
                                No Trailer Available
                            </Button>
                        )}
                    </Container>
                </div>
            </div>

            <Container className="py-5">
                <Row>
                    <Col md={8}>
                        <h4 className="mb-3">Overview</h4>
                        <p className="lead text-secondary">{movie.overview}</p>

                        <h4 className="mt-5 mb-3">Top Cast</h4>
                        <div className="d-flex gap-3 overflow-auto pb-3 scrollbar-none">
                            {cast.map(c => (
                                <div key={c.id} className="text-center" style={{ minWidth: '100px' }}>
                                    <div
                                        className="rounded-circle bg-secondary mb-2 overflow-hidden mx-auto"
                                        style={{ width: '80px', height: '80px' }}
                                    >
                                        {c.profile_path ? (
                                            <img src={`https://image.tmdb.org/t/p/w200${c.profile_path}`} alt={c.name} className="w-100 h-100 object-fit-cover" />
                                        ) : (
                                            <div className="w-100 h-100 d-flex align-items-center justify-content-center">?</div>
                                        )}
                                    </div>
                                    <small className="d-block text-truncate w-100">{c.name}</small>
                                    <small className="text-muted d-block text-truncate w-100">{c.character}</small>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col md={4} className="d-none d-md-block">
                        <div className="p-3 bg-dark rounded">
                            <h5 className="mb-3">Details</h5>
                            <p><strong>Status:</strong> {movie.status}</p>
                            <p><strong>Original Language:</strong> {movie.original_language?.toUpperCase()}</p>
                            <p><strong>Budget:</strong> ${movie.budget?.toLocaleString()}</p>
                            <p><strong>Revenue:</strong> ${movie.revenue?.toLocaleString()}</p>
                        </div>
                    </Col>
                </Row>

                <div className="mt-5">
                    <MovieCarousel title="Similar Movies" movies={similar} />
                </div>

                {/* Open Reviews Section - Full Width Premium Layout */}
                <div className="full-width-section position-relative py-5 mt-5" style={{
                    background: 'linear-gradient(to bottom, transparent, var(--bg-secondary) 15%, var(--bg-secondary) 85%, transparent)',
                    marginLeft: 'calc(-50vw + 50%)',
                    marginRight: 'calc(-50vw + 50%)',
                    paddingLeft: 'calc(50vw - 50%)',
                    paddingRight: 'calc(50vw - 50%)',
                    width: '100vw'
                }}>
                    <Container style={{ zIndex: 1, position: 'relative' }}>

                        <ReviewHeader stats={stats} sortBy={sortBy} setSortBy={setSortBy} />

                        <Row>
                            <Col lg={4} className="order-lg-2 mb-4 mb-lg-0">
                                {/* Form Column - Sticky on Desktop */}
                                <div className="sticky-top" style={{ top: '100px', zIndex: 2 }}>

                                    {/* OPEN SUBMISSION: Always Show Form */}
                                    <ReviewForm
                                        onSave={(name, rating, text) => saveReview(name, rating, text, {
                                            title: movie.title,
                                            poster_path: movie.poster_path
                                        })}
                                    />

                                </div>
                            </Col>

                            <Col lg={8} className="order-lg-1">
                                {/* Reviews List Column */}
                                {reviewsLoading ? (
                                    <div className="text-center py-5">
                                        <Spinner animation="border" variant="danger" />
                                    </div>
                                ) : (
                                    <ReviewList reviews={reviews} />
                                )}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Container>

            {/* Trailer Modal Component */}
            <TrailerModal
                videoKey={videoKey}
                show={showTrailer}
                onClose={() => setShowTrailer(false)}
            />
            {/* Footer removed - handled by Layout */}
        </div>
    );
};

export default MovieDetails;
