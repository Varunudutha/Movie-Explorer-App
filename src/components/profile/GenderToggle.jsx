import React from 'react';
import { FaMale, FaFemale, FaVenusMars } from 'react-icons/fa';

const GenderToggle = ({ selected, onSelect }) => {
    const options = [
        { id: 'male', label: 'Male', icon: <FaMale size={20} /> },
        { id: 'female', label: 'Female', icon: <FaFemale size={20} /> },
        { id: 'other', label: 'Other', icon: <FaVenusMars size={18} /> }
    ];

    return (
        <div className="d-flex gap-3">
            {options.map((option) => (
                <div
                    key={option.id}
                    onClick={() => onSelect(option.id)}
                    className={`
                        d-flex align-items-center gap-2 px-3 py-2 rounded-pill cursor-pointer
                        gender-option ${selected === option.id ? 'active' : ''}
                    `}
                    style={{
                        border: '1px solid var(--border-color)',
                        backgroundColor: selected === option.id ? 'var(--netflix-red)' : 'var(--bg-input)',
                        color: selected === option.id ? '#fff' : 'var(--text-secondary)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                >
                    {option.icon}
                    <span className="fw-bold small">{option.label}</span>
                </div>
            ))}
        </div>
    );
};

export default GenderToggle;
