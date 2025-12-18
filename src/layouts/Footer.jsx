import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';
import cvLogo from '../assets/cv-logo-modern.png';

const Footer = () => {
    return (
        <footer className="pt-5 pb-3 mt-auto" style={{ backgroundColor: '#0f0f0f', borderTop: '1px solid rgba(229, 9, 20, 0.3)' }}>
            <Container>
                <Row className="gy-4 mb-5">

                    {/* 1. BRAND SECTION */}
                    <Col lg={4} md={12} className="mb-4 mb-lg-0">
                        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none mb-3">
                            <img
                                src={cvLogo}
                                alt="CineVerse"
                                style={{ height: '35px', objectFit: 'contain', mixBlendMode: 'screen' }}
                            />
                            <span className="text-white fw-bold fs-4">CINEVERSE</span>
                        </Link>
                        <p className="text-secondary mb-4" style={{ maxWidth: '300px', fontSize: '0.9rem' }}>
                            CineVerse – Explore the World of Cinema. Your ultimate destination for discovering movies, TV shows, and entertainment.
                        </p>
                        <div className="d-flex gap-3">
                            <SocialIcon icon={<FaGithub />} />
                            <SocialIcon icon={<FaLinkedin />} />
                            <SocialIcon icon={<FaTwitter />} />
                            <SocialIcon icon={<FaInstagram />} />
                        </div>
                    </Col>

                    {/* 2. QUICK LINKS */}
                    <Col lg={2} md={3} xs={6}>
                        <h6 className="text-white fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Quick Links</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2">
                            <FooterLink to="/" label="Home" />
                            <FooterLink to="/movies" label="Movies" />
                            <FooterLink to="/movies?type=tv" label="TV Shows" />
                            <FooterLink to="/watchlist" label="Watchlist" />
                        </ul>
                    </Col>

                    {/* 3. DISCOVER */}
                    <Col lg={2} md={3} xs={6}>
                        <h6 className="text-white fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Discover</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2">
                            <FooterLink to="/movies?sort=trending" label="Trending Now" />
                            <FooterLink to="/movies?sort=top_rated" label="Top Rated" />
                            <FooterLink to="/movies?genre=anime" label="Anime" />
                            <FooterLink to="/movies?genre=scifi" label="Sci-Fi" />
                        </ul>
                    </Col>

                    {/* 4. SUPPORT */}
                    <Col lg={2} md={3} xs={6}>
                        <h6 className="text-white fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Support</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2">
                            <FooterLink to="/about" label="About Us" />
                            <FooterLink to="/contact" label="Contact" />
                            <FooterLink to="/faq" label="FAQ" />
                            <FooterLink to="/service-code" label="Service Code" />
                        </ul>
                    </Col>

                    {/* 5. LEGAL */}
                    <Col lg={2} md={3} xs={6}>
                        <h6 className="text-white fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Legal</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2">
                            <FooterLink to="/privacy" label="Privacy Policy" />
                            <FooterLink to="/terms" label="Terms of Service" />
                            <FooterLink to="/cookies" label="Cookie Prefs" />
                            <FooterLink to="/corporate" label="Corporate Info" />
                        </ul>
                    </Col>
                </Row>

                {/* BOTTOM BAR */}
                <div className="border-top border-secondary border-opacity-25 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
                    <p className="text-secondary small mb-0">
                        &copy; {new Date().getFullYear()} CineVerse. All rights reserved.
                    </p>
                    <p className="text-secondary small mb-0 opacity-50">
                        Powered by <span className="fw-bold">TMDB</span>
                    </p>
                </div>
            </Container>
        </footer>
    );
};

const FooterLink = ({ to, label }) => (
    <li>
        <Link
            to={to}
            className="text-secondary text-decoration-none footer-link"
            style={{ fontSize: '0.9rem', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.target.style.color = '#fff'}
            onMouseLeave={(e) => e.target.style.color = '#6c757d'}
        >
            {label}
        </Link>
    </li>
);

const SocialIcon = ({ icon }) => (
    <div
        className="text-white d-flex align-items-center justify-content-center rounded-circle border border-secondary border-opacity-50 social-icon"
        style={{ width: '35px', height: '35px', cursor: 'pointer', transition: 'all 0.3s' }}
        onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#E50914';
            e.currentTarget.style.borderColor = '#E50914';
            e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(108, 117, 125, 0.5)';
            e.currentTarget.style.transform = 'scale(1)';
        }}
    >
        {icon}
    </div>
);

export default Footer;
