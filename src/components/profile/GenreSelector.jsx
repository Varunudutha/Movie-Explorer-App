import React from 'react';

const GENRES = [
    'Action', 'Comedy', 'Drama', 'Sci-Fi',
    'Horror', 'Romance', 'Thriller', 'Animation',
    'Documentary', 'Fantasy', 'Adventure', 'Mystery'
];

const GenreSelector = ({ selectedGenres = [], onToggle }) => {

    const handleClick = (genre) => {
        if (selectedGenres.includes(genre)) {
            onToggle(selectedGenres.filter(g => g !== genre));
        } else {
            onToggle([...selectedGenres, genre]);
        }
    };

    return (
        <div className="d-flex flex-wrap gap-2">
            {GENRES.map((genre) => {
                const isSelected = selectedGenres.includes(genre);
                return (
                    <div
                        key={genre}
                        onClick={() => handleClick(genre)}
                        className="px-3 py-2 rounded-3 small fw-bold genre-chip"
                        style={{
                            cursor: 'pointer',
                            backgroundColor: isSelected ? 'var(--netflix-red)' : 'transparent',
                            color: isSelected ? '#fff' : 'var(--text-secondary)',
                            border: `1px solid ${isSelected ? 'var(--netflix-red)' : 'var(--border-color)'}`,
                            transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            boxShadow: isSelected ? '0 0 15px rgba(229, 9, 20, 0.4)' : 'none'
                        }}
                    >
                        {genre}
                    </div>
                );
            })}

            <style jsx>{`
                .genre-chip:hover {
                    border-color: var(--text-primary) !important;
                    color: var(--text-primary) !important;
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
};

export default GenreSelector;
