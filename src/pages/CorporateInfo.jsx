import React from 'react';
import GlassPage from '../components/GlassPage';

const CorporateInfo = () => {
    return (
        <GlassPage title="Corporate Information">
            <div className="text-white">
                <div className="mb-4">
                    <h5 className="text-netflix-red mb-2">CineVerse Inc.</h5>
                    <p className="opacity-75 mb-1">123 Cinema Boulevard</p>
                    <p className="opacity-75 mb-1">Los Angeles, CA 90028</p>
                    <p className="opacity-75">United States</p>
                </div>

                <div className="mb-4">
                    <h6 className="fw-bold mb-2">Executive Leadership</h6>
                    <ul className="list-unstyled opacity-75">
                        <li className="mb-1"><strong>Udutha Varun</strong> - Founder & CEO</li>
                        <li className="mb-1"><strong>Sarah Connor</strong> - Chief Technology Officer</li>
                        <li><strong>John Smith</strong> - Head of Content</li>
                    </ul>
                </div>

                <div className="mb-4">
                    <h6 className="fw-bold mb-2">Contact</h6>
                    <p className="opacity-75 mb-1">Press: press@cineverse.com</p>
                    <p className="opacity-75">Investors: investors@cineverse.com</p>
                </div>

                <div className="p-3 bg-white text-dark rounded mt-4">
                    <small className="fw-bold">Note:</small>
                    <small className="d-block mt-1">
                        CineVerse is a fictional entity created for portfolio demonstration purposes.
                        No actual corporate entity exists.
                    </small>
                </div>
            </div>
        </GlassPage>
    );
};

export default CorporateInfo;
