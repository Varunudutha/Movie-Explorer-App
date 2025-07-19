import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { WatchlistContext } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
  const { watchlist } = useContext(WatchlistContext);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">🎬 Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="text-center">Your watchlist is empty. Add some movies!</p>
      ) : (
        <Row>
          {watchlist.map((movie) => (
            <Col key={movie.id} sm={6} md={4} lg={3} className="mb-4">
              <MovieCard movie={movie} onSelect={() => {}} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Watchlist;
