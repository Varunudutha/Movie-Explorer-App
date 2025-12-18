import React, { useRef } from 'react';
import { Image } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';

const AvatarUpload = ({ currentImage, onImageChange }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Simple Base64 conversion for demo/portfolio purposes
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="position-relative d-inline-block avatar-container">
            <Image
                src={currentImage || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
                roundedCircle
                style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    border: '4px solid var(--border-color)',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                    cursor: 'pointer'
                }}
                className="avatar-img"
                onClick={() => fileInputRef.current.click()}
            />

            {/* Hover Overlay */}
            <div
                className="position-absolute top-0 start-0 w-100 h-100 rounded-circle d-flex align-items-center justify-content-center avatar-overlay"
                style={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    cursor: 'pointer'
                }}
                onClick={() => fileInputRef.current.click()}
            >
                <div className="text-center text-white">
                    <FaCamera size={24} className="mb-2" />
                    <div className="small fw-bold">CHANGE</div>
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />

            <style jsx>{`
                .avatar-container:hover .avatar-overlay {
                    opacity: 1 !important;
                }
                .avatar-img {
                    transition: transform 0.3s, border-color 0.3s;
                }
                .avatar-container:hover .avatar-img {
                    transform: scale(1.05);
                    border-color: var(--netflix-red) !important;
                }
            `}</style>
        </div>
    );
};

export default AvatarUpload;
