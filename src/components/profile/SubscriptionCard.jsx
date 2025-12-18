import React from 'react';
import { FaLock, FaCrown } from 'react-icons/fa';

const SubscriptionCard = () => {
    return (
        <div
            className="p-4 rounded-4 position-relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
                border: '1px solid var(--border-color)'
            }}
        >
            <div className="d-flex justify-content-between align-items-start position-relative" style={{ zIndex: 2 }}>
                <div>
                    <div className="text-secondary small fw-bold mb-1 letter-spacing-1">CURRENT PLAN</div>
                    <h3 className="fw-bold mb-0 text-white">Free Plan</h3>
                    <div className="badge bg-secondary mt-2 px-3 py-1">Standard Definition</div>
                </div>
                <FaCrown size={40} className="text-muted opacity-25" />
            </div>

            <div className="mt-4 pt-3 border-top border-secondary">
                <button
                    className="btn w-100 d-flex align-items-center justify-content-center gap-2 fw-bold"
                    disabled
                    style={{
                        background: 'linear-gradient(90deg, #d4af37, #f2d06b)',
                        color: '#000',
                        opacity: 0.7,
                        cursor: 'not-allowed',
                        border: 'none'
                    }}
                >
                    <FaLock size={14} />
                    Upgrade to Premium
                </button>
                <div className="text-center mt-2 small text-muted">Unlock 4K & Ad-Free</div>
            </div>
        </div>
    );
};

export default SubscriptionCard;
