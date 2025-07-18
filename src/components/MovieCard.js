import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const MovieCard = ({ movie, onSelect }) => {
  const {
    poster_path,
    title,
    release_date,
    vote_average,
    overview,
    vote_count,
    original_language,
  } = movie;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const releaseYear = release_date ? release_date.split('-')[0] : 'N/A';

  // Truncate overview text for card
  const truncateOverview = (text, maxLength = 100) => {
    if (!text) return 'No description available.';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <Card onClick={onSelect} style={{ cursor: 'pointer', minHeight: '480px' }} className="h-100">
      <Card.Img variant="top" src={posterUrl} alt={title} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <div className="mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
          {releaseYear} | <Badge bg="info">{original_language.toUpperCase()}</Badge>
        </div>
        <Card.Text style={{ flexGrow: 1 }}>{truncateOverview(overview)}</Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Badge bg={vote_average >= 7 ? 'success' : vote_average >= 5 ? 'warning' : 'danger'}>
            ⭐ {vote_average.toFixed(1)}
          </Badge>
          <small className="text-muted">{vote_count} votes</small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
