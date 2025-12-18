import React from 'react';
import GlassPage from '../components/GlassPage';

const ServiceCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000); // Random 6 digit code

    return (
        <GlassPage title="Service Code" maxWidth="600px">
            <div className="text-center">
                <p className="lead text-white-50 mb-4">
                    Use this code when contacting support regarding account verification or technical issues.
                </p>

                <div
                    className="display-1 fw-bold text-white mb-4 py-4 rounded-3"
                    style={{
                        background: 'rgba(0,0,0,0.3)',
                        border: '2px dashed #444',
                        letterSpacing: '10px'
                    }}
                >
                    {code}
                </div>

                <div className="text-start p-3 rounded bg-dark bg-opacity-50 small text-secondary font-monospace">
                    <div>Status: <span className="text-success">● API Online</span></div>
                    <div>Region: IN-South-1</div>
                    <div>Version: v2.4.0-stable</div>
                    <div>Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                </div>

                <div className="mt-4">
                    <p className="text-muted small">
                        This code expires in 15:00 minutes. Do not share this code with anyone.
                    </p>
                </div>
            </div>
        </GlassPage>
    );
};

export default ServiceCode;
