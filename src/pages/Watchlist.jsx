import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { WatchlistContext } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import { FaRegSadTear } from 'react-icons/fa';

const Watchlist = () => {
    const { watchlist } = useContext(WatchlistContext);

    return (
        <Container className="py-5" style={{ minHeight: '80vh', marginTop: '80px' }}>
            <h2 className="mb-4 text-white fw-bold border-start border-4 border-danger ps-3">My Watchlist</h2>

            {watchlist.length === 0 ? (
                <div className="text-center py-5">
                    <FaRegSadTear className="display-1 text-muted mb-3" />
                    <h3 className="text-muted">Your watchlist is empty.</h3>
                    <p className="lead text-secondary mb-4">Go explore some movies and add them here!</p>
                    <Button as={Link} to="/movies" variant="danger" size="lg">Evaluate Movies</Button>
                </div>
            ) : (
                <Row>
                    {watchlist.map((movie) => (
                        <Col key={movie.id} xs={6} md={4} lg={3} xl={2} className="mb-4">
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Watchlist;
