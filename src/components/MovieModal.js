import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

const MovieModal = ({ show, movie, onHide }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column flex-md-row">
          <Image
            src={imageUrl}
            alt={movie.title}
            rounded
            style={{ width: '250px', height: '375px', objectFit: 'cover', marginRight: '20px' }}
          />
          <div>
            <p><strong>Release Date:</strong> {movie.release_date || 'N/A'}</p>
            <p><strong>Rating:</strong> {movie.vote_average || 'N/A'} ⭐</p>
            <p><strong>Overview:</strong></p>
            <p>{movie.overview || 'No description available.'}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;
