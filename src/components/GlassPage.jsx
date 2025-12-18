import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

const GlassPage = ({ title, children, maxWidth = '800px' }) => {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: 'url("https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '80px',
            paddingBottom: '40px'
        }}>
            {/* Dark Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 1
            }}></div>

            <Container className="position-relative z-2 d-flex justify-content-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                        background: 'rgba(20, 20, 20, 0.65)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        padding: '3rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                        width: '100%',
                        maxWidth: maxWidth,
                        color: 'white'
                    }}
                >
                    {title && (
                        <h2 className="text-center fw-bold mb-4 display-6" style={{ letterSpacing: '1px' }}>
                            {title}
                        </h2>
                    )}

                    {children}
                </motion.div>
            </Container>
        </div>
    );
};

export default GlassPage;
