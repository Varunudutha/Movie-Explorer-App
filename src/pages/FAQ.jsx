import React from 'react';
import { Accordion } from 'react-bootstrap';
import GlassPage from '../components/GlassPage';

const FAQ = () => {
    return (
        <GlassPage title="Frequently Asked Questions">
            <Accordion defaultActiveKey="0" className="glass-accordion">
                <Accordion.Item eventKey="0" className="bg-transparent mb-3 border-0">
                    <Accordion.Header>What is CineVerse?</Accordion.Header>
                    <Accordion.Body className="text-white opacity-75">
                        CineVerse is a premium movie discovery platform that lets you explore trending movies,
                        watch trailers, and organize your watchlist in a Netflix-style interface.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="bg-transparent mb-3 border-0">
                    <Accordion.Header>Is CineVerse free?</Accordion.Header>
                    <Accordion.Body className="text-white opacity-75">
                        Yes! CineVerse is a completely free project built for educational purposes.
                        Simply browse and enjoy exploring the world of cinema.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="bg-transparent mb-3 border-0">
                    <Accordion.Header>How do I create a watchlist?</Accordion.Header>
                    <Accordion.Body className="text-white opacity-75">
                        Click the "Add to Watchlist" button on any movie card or detail page.
                        Your selections are saved locally on your device.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className="bg-transparent mb-3 border-0">
                    <Accordion.Header>Where does the data come from?</Accordion.Header>
                    <Accordion.Body className="text-white opacity-75">
                        We powered by the TMDB (The Movie Database) API, ensuring you get the most up-to-date information on millions of movies and TV shows.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <style>
                {`
                    .glass-accordion .accordion-button {
                        background-color: rgba(255, 255, 255, 0.05);
                        color: white;
                        border-radius: 8px;
                        backdrop-filter: blur(5px);
                    }
                    .glass-accordion .accordion-button:not(.collapsed) {
                        background-color: rgba(229, 9, 20, 0.2);
                        color: #E50914;
                        box-shadow: none;
                    }
                    .glass-accordion .accordion-button:focus {
                        box-shadow: none;
                    }
                `}
            </style>
        </GlassPage>
    );
};

export default FAQ;
