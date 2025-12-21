import React, { useState, useEffect, useRef } from 'react';
import { Form, ListGroup, Image, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaSearch, FaTimes, FaStar, FaMicrophone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import tmdb, { movieType } from '../services/tmdbApi';
import useDebounce from '../hooks/useDebounce';
import useVoiceSearch, { VOICE_STATUS } from '../hooks/useVoiceSearch';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Voice Search Hook (State Machine)
    const {
        status,
        transcript,
        startListening,
        resetState,
        isSupported,
        error
    } = useVoiceSearch();

    const debouncedQuery = useDebounce(query, 400); // 400ms delay
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    // Helper: State Assertions
    const isListening = status === VOICE_STATUS.LISTENING;
    const isError = status === VOICE_STATUS.ERROR;
    const isSuccess = status === VOICE_STATUS.SUCCESS;

    // Update query when voice transcript changes
    useEffect(() => {
        if (transcript) {
            setQuery(transcript);
            if (!isOpen) setIsOpen(true);
        }
    }, [transcript, isOpen]);

    // Fetch suggestions when debounced query changes
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([]);
            return;
        }

        const fetchSuggestions = async () => {
            setIsLoading(true);
            try {
                // Determine if we search specific type or multi. For now specific movie.
                const response = await tmdb.search(debouncedQuery, { page: 1 });
                // Take top 5 valid results (must have poster or title)
                const hits = response.data.results
                    .filter(item => item.poster_path || item.known_for_department) // Basic filter
                    .slice(0, 5);
                setResults(hits);
                setIsOpen(true);
            } catch (err) {
                console.error("Search error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/movies?query=${query}`);
            setIsOpen(false);
            setQuery(''); // Optional: clear after full search
            if (inputRef.current) inputRef.current.blur();
        }
    };

    const handleResultClick = (id) => {
        navigate(`/movie/${id}`);
        setIsOpen(false);
        setQuery('');
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setIsOpen(false);
        if (inputRef.current) inputRef.current.focus();
    };

    // Handle Mic Click
    const handleMicClick = () => {
        if (isListening) {
            // If listening, stop/reset
            resetState();
        } else if (isError) {
            // If error, click again to retry immediately
            resetState(); // Clear error
            startListening();
            if (inputRef.current) inputRef.current.focus();
        } else {
            // Idle -> Start
            setQuery('');
            startListening();
            if (inputRef.current) inputRef.current.focus();
        }
    };

    // Tooltip for Voice Status
    const renderTooltip = (props) => {
        let msg = "Search by voice";
        if (!isSupported) msg = "Voice search not supported";
        else if (isListening) msg = "Listening...";
        else if (isError) msg = error || "Error occurred";

        return (
            <Tooltip id="voice-tooltip" {...props}>
                {msg}
            </Tooltip>
        );
    };

    // Placeholder Logic
    const getPlaceholder = () => {
        if (isError) return "Try again...";
        if (isListening) return "Listening...";
        if (isSuccess) return "Searching...";
        return "Search movies, series...";
    };

    return (
        <div className="position-relative" ref={wrapperRef} style={{ width: '300px' }}>
            {/* Search Input Pill */}
            <Form onSubmit={handleSubmit} className="d-flex align-items-center position-relative">
                <FaSearch
                    className="position-absolute text-muted"
                    style={{ left: '15px', zIndex: 10, pointerEvents: 'none' }}
                />

                <Form.Control
                    ref={inputRef}
                    type="text"
                    placeholder={getPlaceholder()}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 0 && setIsOpen(true)}
                    className={`border-0 shadow-none text-white search-input ${isListening ? 'listening-mode' : ''} ${isError ? 'error-mode' : ''}`}
                    style={{
                        paddingLeft: '45px',
                        paddingRight: '80px', // Increased padding for icons
                        borderRadius: '50px',
                        backgroundColor: 'var(--bg-input)',
                        backdropFilter: 'blur(10px)',
                        border: isListening
                            ? '1px solid var(--netflix-red)'
                            : (isError ? '1px solid #ff4444' : '1px solid var(--border-color)'),
                        height: '45px',
                        transition: 'all 0.3s ease',
                        boxShadow: isListening ? '0 0 15px rgba(229, 9, 20, 0.5)' : 'none'
                    }}
                />

                {/* Icons Container (Mic + Close/Loading) */}
                <div className="position-absolute end-0 me-3 d-flex align-items-center gap-2">

                    {/* Voice Search Icon */}
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                        show={isError || undefined} // Always show on error
                    >
                        <div
                            className={`mic-icon-wrapper ${isListening ? 'is-listening' : ''} ${isError ? 'has-error' : ''}`}
                            onClick={handleMicClick}
                            style={{
                                cursor: 'pointer',
                                opacity: isSupported ? 1 : 0.5,
                                pointerEvents: isSupported ? 'auto' : 'none',
                                position: 'relative' // for pulse
                            }}
                        >
                            <FaMicrophone
                                className={isListening ? "text-danger" : (isError ? "text-danger" : "text-secondary")}
                            />
                            {isListening && <span className="listening-pulse"></span>}
                        </div>
                    </OverlayTrigger>

                    {/* Divider */}
                    {(query || isLoading) && <div style={{ height: '20px', width: '1px', background: '#444' }}></div>}

                    {isLoading ? (
                        <Spinner animation="border" size="sm" variant="danger" />
                    ) : (
                        query && (
                            <FaTimes
                                className="text-secondary cursor-pointer hover-text-white"
                                onClick={clearSearch}
                                style={{ cursor: 'pointer' }}
                            />
                        )
                    )}
                </div>
            </Form>

            {/* Smart Dropdown */}
            {isOpen && (results.length > 0 || isLoading) && (
                <ListGroup
                    className="position-absolute w-100 mt-2 shadow-lg search-dropdown fade-in"
                    style={{
                        zIndex: 1000,
                        backgroundColor: 'var(--bg-glass)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }}
                >
                    {results.map((item) => (
                        <ListGroup.Item
                            key={item.id}
                            action
                            onClick={() => handleResultClick(item.id)}
                            className="d-flex align-items-center gap-3 border-0 bg-transparent text-white p-3 search-item"
                        >
                            <Image
                                src={item.poster_path
                                    ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                                    : 'https://via.placeholder.com/45x68?text=No+Img'}
                                rounded
                                style={{ width: '45px', height: '68px', objectFit: 'cover' }}
                            />
                            <div className="flex-grow-1">
                                <div className="fw-bold text-truncate" style={{ maxWidth: '180px' }}>
                                    {item.title || item.name}
                                </div>
                                <div className="small text-secondary d-flex align-items-center gap-2">
                                    {(item.release_date || item.first_air_date)?.split('-')[0]}
                                    {item.vote_average > 0 && (
                                        <span className="text-warning d-flex align-items-center gap-1">
                                            <FaStar size={10} /> {item.vote_average.toFixed(1)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}

                    {/* View All Button */}
                    <ListGroup.Item
                        action
                        onClick={handleSubmit}
                        className="text-center text-primary fw-bold py-3 bg-transparent border-top border-secondary"
                        style={{ fontSize: '0.9rem', borderColor: 'var(--border-color)' }}
                    >
                        See all results for "{query}"
                    </ListGroup.Item>
                </ListGroup>
            )}

            {/* In-File Styles for Search Specifics */}
            <style jsx>{`
                .search-input:focus {
                    background-color: var(--bg-glass) !important;
                    box-shadow: 0 0 0 1px var(--netflix-red) !important;
                    color: var(--text-primary) !important;
                }
                .search-input.error-mode:focus {
                     box-shadow: 0 0 0 1px #ff4444 !important;
                }
                .search-item:hover {
                    background-color: rgba(255, 255, 255, 0.1) !important;
                }
                /* Mic Animation */
                .mic-icon-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                .mic-icon-wrapper:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
                .mic-icon-wrapper.is-listening {
                    background-color: rgba(229, 9, 20, 0.1);
                }
                .mic-icon-wrapper.has-error {
                     animation: shake 0.5s;
                }
                
                @keyframes shake {
                    0% { transform: translateX(0); }
                    25% { transform: translateX(-2px); }
                    50% { transform: translateX(2px); }
                    75% { transform: translateX(-2px); }
                    100% { transform: translateX(0); }
                }

                .listening-pulse {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 1px solid var(--netflix-red);
                    animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
                }
                @keyframes pulse-ring {
                    0% {
                        transform: scale(0.8);
                        opacity: 0.8;
                    }
                    80% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }

                /* Ensure text colors are correct in Light Mode */
                .light-theme .search-input {
                    color: var(--text-primary) !important;
                    background-color: rgba(0,0,0,0.05) !important;
                }
                .light-theme .search-dropdown {
                    background-color: rgba(255,255,255,0.95) !important;
                }
                .light-theme .search-item {
                    color: var(--text-primary) !important;
                }
                .light-theme .search-item:hover {
                    background-color: rgba(0,0,0,0.05) !important;
                }
            `}</style>
        </div>
    );
};

export default SearchBar;
