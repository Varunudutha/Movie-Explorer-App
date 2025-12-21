import React from 'react';
import { Modal } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import TrailerPlayer from './TrailerPlayer';

const TrailerModal = ({ show, onClose, videoKey }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            size="xl"
            centered
            className="trailer-modal"
            contentClassName="bg-black border-0 rounded-0"
            backdrop="static"
            keyboard={true}
            animation={true}
        >
            <Modal.Header className="border-0 position-absolute w-100 z-3 p-3 d-flex justify-content-end align-items-start pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}>
                <button
                    onClick={onClose}
                    className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center border-0 pointer-events-auto"
                    style={{ width: '40px', height: '40px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                    aria-label="Close"
                >
                    <IoClose size={24} color="white" />
                </button>
            </Modal.Header>
            <Modal.Body className="p-0 bg-black position-relative" style={{ height: '80vh', minHeight: '400px' }}>
                {show && (
                    videoKey ? (
                        <TrailerPlayer videoKey={videoKey} />
                    ) : (
                        <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white">
                            <h4 className="mb-3">Trailer Unavailable</h4>
                            <p className="text-secondary">Sorry, we couldn't find a trailer for this title.</p>
                        </div>
                    )
                )}
            </Modal.Body>
        </Modal>
    );
};

export default TrailerModal;
