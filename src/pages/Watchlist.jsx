import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { WatchlistContext } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import { FaRegSadTear, FaPlusCircle } from 'react-icons/fa';

const Watchlist = () => {
    const { watchlist } = useContext(WatchlistContext);

    return (
        <div className="page-container" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '80px', transition: 'background-color 0.3s ease' }}>
            <Container className="py-5">
                <h2 className="mb-4 fw-bold border-start border-4 border-danger ps-3">My Watchlist</h2>

                {watchlist.length === 0 ? (
                    <div className="d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: "50vh" }}>
                        <div className="text-secondary opacity-50 mb-4">
                            <FaPlusCircle size={80} />
                        </div>
                        <h3 className="fw-bold mb-2">Your watchlist is empty</h3>
                        <p className="lead text-secondary mb-4 text-center" style={{ maxWidth: "500px" }}>
                            Movies you add to your watchlist will appear here.
                            Explore movies and click the <FaPlusCircle className="mx-1" /> icon to save them.
                        </p>
                        <Button as={Link} to="/movies" className="btn-netflix btn-lg">
                            Explore Movies
                        </Button>
                    </div>
                ) : (
                    <Row className="gy-4">
                        {watchlist.map((movie) => (
                            <Col key={movie.id} xs={6} md={4} lg={3} xl={2}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};


export default Watchlist;
