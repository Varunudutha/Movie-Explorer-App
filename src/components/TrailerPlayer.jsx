import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import ReactPlayer from 'react-player';

const TrailerPlayer = ({ videoKey, show, onClose }) => {
    const [playing, setPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);

    // Reset states when modal is closed or opened
    useEffect(() => {
        if (!show) {
            setPlaying(false);
            setIsReady(false);
        }
    }, [show]);

    // Only start playing when the player reports it is ready
    const handleReady = () => {
        setIsReady(true);
        if (show) {
            setPlaying(true);
        }
    };

    const handleClose = () => {
        // Just stop playing and close.
        // If we invoke this before the player is ready, playing is false, so no pause() call happens.
        // If we invoke this after ready, play() is likely resolved.
        setPlaying(false);
        onClose();
    };

    if (!videoKey) return null;

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            centered
            className="trailer-modal"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className="bg-dark border-0">
                <Modal.Title className="text-white">Watch Trailer</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 bg-black position-relative">
                <div className="ratio ratio-16x9">
                    {/* Render Player only when show is true to ensure fresh instance */}
                    {show && (
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${videoKey}`}
                            width="100%"
                            height="100%"
                            controls={true}
                            playing={playing}
                            onReady={handleReady}
                            onEnded={() => setPlaying(false)}
                            config={{
                                youtube: {
                                    playerVars: {
                                        origin: window.location.origin,
                                        modestbranding: 1,
                                        rel: 0,
                                        autoplay: 0 // We control autoplay via props
                                    }
                                }
                            }}
                            style={{ opacity: isReady ? 1 : 0, transition: 'opacity 0.3s' }}
                        />
                    )}

                    {/* Loading Spinner */}
                    {!isReady && show && (
                        <div className="position-absolute top-50 start-50 translate-middle text-white">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default TrailerPlayer;
