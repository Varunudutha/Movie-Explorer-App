import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import cvLogo from '../assets/cv-logo-modern.png';
import SearchBar from '../components/SearchBar';

const AppNavbar = () => {
    const { isDark, toggleTheme } = useTheme();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    // Change navbar background on scroll
    window.onscroll = () => {
        setScrolled(window.pageYOffset !== 0);
        return () => (window.onscroll = null);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <Navbar
            expand="lg"
            fixed="top"
            className={scrolled ? 'shadow-lg' : ''}
            style={{
                backgroundColor: scrolled ? 'var(--bg-glass)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                transition: 'all 0.5s ease',
                padding: '15px 0'
            }}
        >
            <Container fluid className="px-5">
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="d-flex align-items-center gap-2"
                    style={{ textDecoration: 'none' }}
                >
                    <img
                        src={cvLogo}
                        alt="CV"
                        style={{
                            height: '35px',
                            borderRadius: '4px',
                            objectFit: 'contain',
                        }}
                        className="brand-logo"
                    />
                    <span className="fw-bold fs-5 text-netflix-red d-none d-sm-block" style={{ letterSpacing: '1px' }}>
                        CINEVERSE
                    </span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" className="border-0 text-white" />

                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0 gap-4 ms-4" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
                        <Nav.Link as={Link} to="/watchlist">Watchlist</Nav.Link>
                    </Nav>

                    <div className="d-flex align-items-center gap-4">
                        {/* 1. Integrated Smart Search Bar */}
                        <div className="d-none d-lg-block">
                            <SearchBar />
                        </div>

                        {/* 2. Theme Toggle with Animation */}
                        <div
                            onClick={toggleTheme}
                            style={{ cursor: 'pointer', color: 'var(--text-primary)' }}
                            className="fs-5 p-2 rounded-circle hover-bg-light transition-all"
                            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDark ? <FaSun className="text-warning" /> : <FaMoon className="text-secondary" />}
                        </div>

                        {/* 3. User Profile / Auth Actions */}
                        {currentUser ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle variant="link" id="dropdown-custom-components" className="p-0 border-0" style={{ color: 'var(--text-primary)' }}>
                                    <FaUserCircle size={30} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu
                                    style={{
                                        backgroundColor: 'var(--bg-secondary)',
                                        borderColor: 'var(--border-color)',
                                        minWidth: '200px'
                                    }}
                                >
                                    <div className="px-3 py-2 small border-bottom" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
                                        {currentUser.email}
                                    </div>
                                    <Dropdown.Item as={Link} to="/profile" className="text-theme-item">Profile</Dropdown.Item>
                                    <Dropdown.Divider style={{ borderColor: 'var(--border-color)' }} />
                                    <Dropdown.Item onClick={handleLogout} className="text-danger fw-bold">Sign out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link to="/login">
                                    <Button variant="link" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="danger" className="fw-bold px-3 btn-netflix">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
            <style jsx>{`
                .hover-bg-light:hover { background-color: rgba(255,255,255,0.1); }
                .text-theme-item { color: var(--text-primary) !important; }
                .text-theme-item:hover { background-color: rgba(255,255,255,0.1) !important; }
            `}</style>
        </Navbar>
    );
};

export default AppNavbar;
