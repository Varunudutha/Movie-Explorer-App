import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { WatchlistContext } from '../context/WatchlistContext';

const MovieCard = ({ movie, onClick }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const { watchlist, toggleWatchlist } = useContext(WatchlistContext);
  const isInWatchlist = watchlist.some(m => m.id === movie.id);

  return (
    <Card className="h-100 shadow-sm" onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card.Img variant="top" src={imageUrl} style={{ height: '400px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.overview ? movie.overview.slice(0, 100) + '...' : 'No description.'}</Card.Text>
        <Button
          variant={isInWatchlist ? 'danger' : 'outline-primary'}
          onClick={(e) => {
            e.stopPropagation(); // Prevent modal open
            toggleWatchlist(movie);
          }}
        >
          {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
