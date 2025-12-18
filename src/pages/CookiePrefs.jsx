import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import GlassPage from '../components/GlassPage';

const CookiePrefs = () => {
    const [prefs, setPrefs] = useState({
        essential: true,
        analytics: true,
        marketing: false
    });

    const handleToggle = (key) => {
        setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <GlassPage title="Cookie Preferences">
            <p className="text-white opacity-75 mb-4">
                Manage your cookie settings. We use cookies to analyze our traffic and personalize content.
            </p>

            <div className="bg-dark bg-opacity-50 p-3 rounded mb-3 border border-secondary border-opacity-25">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="text-white mb-0">Essential Cookies</h6>
                        <small className="text-muted">Required for the site to function properly.</small>
                    </div>
                    <Form.Check
                        type="switch"
                        id="essential-switch"
                        checked={prefs.essential}
                        disabled
                        style={{ transform: 'scale(1.2)' }}
                    />
                </div>
            </div>

            <div className="bg-dark bg-opacity-50 p-3 rounded mb-3 border border-secondary border-opacity-25">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="text-white mb-0">Analytics Cookies</h6>
                        <small className="text-muted">Help us improve our website by collecting usage information.</small>
                    </div>
                    <Form.Check
                        type="switch"
                        id="analytics-switch"
                        checked={prefs.analytics}
                        onChange={() => handleToggle('analytics')}
                        style={{ transform: 'scale(1.2)' }}
                    />
                </div>
            </div>

            <div className="bg-dark bg-opacity-50 p-3 rounded mb-4 border border-secondary border-opacity-25">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="text-white mb-0">Marketing Cookies</h6>
                        <small className="text-muted">Used to deliver relevant advertisements.</small>
                    </div>
                    <Form.Check
                        type="switch"
                        id="marketing-switch"
                        checked={prefs.marketing}
                        onChange={() => handleToggle('marketing')}
                        style={{ transform: 'scale(1.2)' }}
                    />
                </div>
            </div>

            <div className="d-flex gap-3">
                <Button variant="danger" className="flex-grow-1">Save Preferences</Button>
                <Button variant="outline-light" className="flex-grow-1">Accept All</Button>
            </div>
        </GlassPage>
    );
};

export default CookiePrefs;
