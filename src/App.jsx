import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { ThemeProvider } from './context/ThemeContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

// Pages
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ServiceCode from './pages/ServiceCode';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import CookiePrefs from './pages/CookiePrefs';
import CorporateInfo from './pages/CorporateInfo';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';

// Styles
import './App.css';

const AppContent = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-black text-white">
                <Spinner animation="border" variant="danger" style={{ width: '3rem', height: '3rem' }} />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            {currentUser && <Navbar />}
            <div className="flex-grow-1">
                <Routes>
                    {currentUser ? (
                        <>
                            {/* Authenticated Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/movies" element={<Movies />} />
                            <Route path="/movie/:id" element={<MovieDetails />} />
                            <Route path="/watchlist" element={<Watchlist />} />
                            <Route path="/profile" element={<Profile />} />

                            {/* Footer Pages */}
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/service-code" element={<ServiceCode />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/cookies" element={<CookiePrefs />} />
                            <Route path="/corporate" element={<CorporateInfo />} />

                            {/* Redirect Login/Signup to Home if already logged in */}
                            <Route path="/login" element={<Navigate to="/" />} />
                            <Route path="/signup" element={<Navigate to="/" />} />

                            {/* Catch all */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            {/* Public Routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            {/* Redirect everything else to Login */}
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
            </div>
            {currentUser && <Footer />}
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <WatchlistProvider>
                    <Router>
                        <AppContent />
                    </Router>
                </WatchlistProvider>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
