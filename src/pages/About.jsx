import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { FaReact, FaFire, FaDatabase, FaFilm, FaSearch, FaStar, FaPlayCircle, FaMobileAlt, FaCode } from 'react-icons/fa';
import { SiFramer, SiBootstrap, SiVercel } from 'react-icons/si';

const FeatureCard = ({ icon, title, desc, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(229, 9, 20, 0.2)' }}
            className="h-100"
        >
            <div className="h-100 p-4 rounded-3 border border-secondary border-opacity-25" style={{ background: 'linear-gradient(145deg, #1a1a1a, #0f0f0f)' }}>
                <div className="display-5 text-netflix-red mb-3">{icon}</div>
                <h4 className="fw-bold text-white mb-2">{title}</h4>
                <p className="text-secondary small mb-0">{desc}</p>
            </div>
        </motion.div>
    );
};

const TechBadge = ({ icon, name }) => (
    <motion.div
        whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.5)' }}
        className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-secondary border-opacity-25 bg-black bg-opacity-50"
    >
        <span className="text-white fs-5">{icon}</span>
        <span className="text-secondary small fw-bold">{name}</span>
    </motion.div>
);

const About = () => {
    // Scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-page" style={{ minHeight: '100vh', paddingBottom: '80px', paddingTop: '80px', backgroundColor: '#141414' }}>

            {/* HERO SECTION */}
            <section className="position-relative mb-5 pb-5 overflow-hidden">
                <Container className="text-center position-relative z-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="display-1 fw-bold text-white mb-3" style={{ letterSpacing: '-2px' }}>
                            About <span className="text-netflix-red">CineVerse</span>
                        </h1>
                        <p className="lead text-secondary fs-3 fw-light mb-4">
                            Discover Movies. Explore Stories. Experience Cinema.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <div style={{ height: '4px', width: '80px', background: '#E50914', borderRadius: '2px' }}></div>
                        </div>
                    </motion.div>
                </Container>

                {/* Background Glow */}
                <div className="position-absolute top-50 start-50 translate-middle" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(229,9,20,0.15) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none' }}></div>
            </section>

            {/* INTRO CONTENT */}
            <Container className="mb-5">
                <Row className="justify-content-center">
                    <Col md={10} lg={8} className="text-center">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-white fs-5 lh-lg"
                        >
                            CineVerse is a next-generation immersive movie discovery platform designed for cinema lovers.
                            Powered by real-time data from <span className="text-info fw-bold">TMDB</span>, we bring you the latest trending blockbuster hits,
                            hidden gems, and timeless classics in a premium, Netflix-style interface.
                            Whether you’re looking for your next binge-watch or deep-diving into filmography, CineVerse is your ultimate companion.
                        </motion.p>
                    </Col>
                </Row>
            </Container>

            {/* FEATURES GRID */}
            <Container className="mb-5 py-5">
                <div className="text-center mb-5">
                    <h6 className="text-netflix-red fw-bold uppercase tracking-widest mb-2">FEATURES</h6>
                    <h2 className="text-white fw-bold display-6">Why Choose CineVerse?</h2>
                </div>

                <Row className="g-4">
                    <Col md={4}>
                        <FeatureCard
                            icon={<FaFilm />}
                            title="Vast Library"
                            desc="Access millions of movies and TV shows across infinite genres."
                            delay={0.1}
                        />
                    </Col>
                    <Col md={4}>
                        <FeatureCard
                            icon={<FaSearch />}
                            title="Smart Discovery"
                            desc="Find exactly what you want with advanced filters and real-time search."
                            delay={0.2}
                        />
                    </Col>
                    <Col md={4}>
                        <FeatureCard
                            icon={<FaStar />}
                            title="Ratings & Info"
                            desc="Get detailed insights, cast info, and community ratings instantly."
                            delay={0.3}
                        />
                    </Col>
                    <Col md={4}>
                        <FeatureCard
                            icon={<FaPlayCircle />}
                            title="Instant Trailers"
                            desc="Watch high-quality trailers directly within the app without leaving."
                            delay={0.4}
                        />
                    </Col>
                    <Col md={4}>
                        <FeatureCard
                            icon={<FaMobileAlt />}
                            title="Fully Responsive"
                            desc="Enjoy a seamless cinematic experience on Mobile, Tablet, and Desktop."
                            delay={0.5}
                        />
                    </Col>
                    <Col md={4}>
                        <FeatureCard
                            icon={<FaCode />}
                            title="Modern Tech"
                            desc="Built with the latest web technologies for speed and performance."
                            delay={0.6}
                        />
                    </Col>
                </Row>
            </Container>

            {/* TECH STACK */}
            <Container className="py-5 border-top border-secondary border-opacity-25">
                <Row className="align-items-center">
                    <Col md={5} className="mb-4 mb-md-0">
                        <h3 className="text-white fw-bold mb-3">Powering the Experience</h3>
                        <p className="text-secondary">
                            CineVerse is built with a modern, scalable technology stack to ensure performance, reliability, and smooth animations.
                        </p>
                    </Col>
                    <Col md={7}>
                        <div className="d-flex flex-wrap gap-3 justify-content-start justify-content-md-end">
                            <TechBadge icon={<FaReact color="#61DAFB" />} name="React.js" />
                            <TechBadge icon={<FaDatabase color="#01B4E4" />} name="TMDB API" />
                            <TechBadge icon={<FaFire color="#FFCA28" />} name="Firebase" />
                            <TechBadge icon={<SiBootstrap color="#7952B3" />} name="Bootstrap 5" />
                            <TechBadge icon={<SiFramer color="white" />} name="Framer Motion" />
                            <TechBadge icon={<SiVercel color="white" />} name="Vercel" />
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* FOOTER NOTE */}
            <Container className="text-center mt-5 pt-5">
                <p className="text-secondary small fst-italic">
                    "Built with passion for cinema and modern web experiences."
                </p>
                <div className="text-secondary opacity-50 small mt-3">
                    © {new Date().getFullYear()} CineVerse. All rights reserved.
                </div>
            </Container>
        </div>
    );
};

export default About;
