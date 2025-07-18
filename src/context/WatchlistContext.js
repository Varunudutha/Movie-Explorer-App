import React, { createContext, useState, useEffect } from 'react';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('watchlist');
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movie) => {
    setWatchlist(prev => {
      const exists = prev.find(m => m.id === movie.id);
      if (exists) {
        return prev.filter(m => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};
