import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import { WatchlistProvider } from './context/WatchlistContext';
import { genres } from './data/genres';
import Watchlist from './pages/Watchlist';

const Home = ({
  query, handleSearch, clearFilters,
  selectedGenre, setSelectedGenre,
  year, setYear, language, setLanguage,
  sort, setSort,
  movies, loading, loader,
  setSelectedMovie, selectedMovie
}) => (
  <>
    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
      <SearchBar query={query} onSearch={handleSearch} />
      <Button variant="secondary" onClick={clearFilters}>Clear Filters</Button>
    </div>

    <div className="mb-3 d-flex flex-wrap justify-content-center gap-2">
      <Button
        variant={selectedGenre === null ? 'primary' : 'outline-primary'}
        onClick={() => setSelectedGenre(null)}
      >
        All Genres
      </Button>
      {genres.map(g => (
        <Button
          key={g.id}
          variant={selectedGenre === g.id ? 'primary' : 'outline-primary'}
          onClick={() => setSelectedGenre(g.id)}
        >
          {g.name}
        </Button>
      ))}
    </div>

    <Row className="mb-3 g-3">
      <Col md={3} sm={6}>
        <Form.Group controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="e.g. 2023"
            value={year}
            onChange={e => setYear(e.target.value)}
          />
        </Form.Group>
      </Col>
      <Col md={3} sm={6}>
        <Form.Group controlId="language">
          <Form.Label>Language</Form.Label>
          <Form.Select value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="">All</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="te">Telugu</option>
            <option value="ta">Tamil</option>
            <option value="kn">Kannada</option>
            <option value="ml">Malayalam</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={3} sm={6}>
        <Form.Group controlId="sort">
          <Form.Label>Sort By</Form.Label>
          <Form.Select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="popularity.desc">Popularity Desc</option>
            <option value="popularity.asc">Popularity Asc</option>
            <option value="vote_average.desc">Rating Desc</option>
            <option value="vote_average.asc">Rating Asc</option>
            <option value="release_date.desc">Release Date Desc</option>
            <option value="release_date.asc">Release Date Asc</option>
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>

    <Row>
      {movies.length === 0 && !loading && (
        <p className="text-center w-100">No movies found.</p>
      )}
      {movies.map(movie => (
        <Col key={movie.id} sm={6} md={4} lg={3} className="mb-4">
          <MovieCard movie={movie} onSelect={() => setSelectedMovie(movie)} />
        </Col>
      ))}
    </Row>

    {loading && (
      <div className="text-center my-3">
        <Spinner animation="border" />
      </div>
    )}

    <div ref={loader} />

    {selectedMovie && (
      <MovieModal
        show={true}
        movie={selectedMovie}
        handleClose={() => setSelectedMovie(null)}
      />
    )}
  </>
);

const App = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [year, setYear] = useState('');
  const [language, setLanguage] = useState('');
  const [sort, setSort] = useState('popularity.desc');
  const [darkMode, setDarkMode] = useState(false);

  const loader = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  const fetchMovies = useCallback(async (reset = false) => {
    setLoading(true);
    try {
      let url = '';
      let params = {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        page,
        sort_by: sort,
        with_original_language: language || undefined,
        primary_release_year: year || undefined,
        with_genres: selectedGenre || undefined,
      };

      if (debouncedQuery) {
        url = 'https://api.themoviedb.org/3/search/movie';
        params.query = debouncedQuery;
      } else {
        url = 'https://api.themoviedb.org/3/movie/popular';
      }

      const response = await axios.get(url, { params });

      if (reset) {
        setMovies(response.data.results);
      } else {
        setMovies(prev => [...prev, ...response.data.results]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  }, [page, debouncedQuery, sort, language, year, selectedGenre]);

  useEffect(() => {
    if (page === 1) return;
    fetchMovies();
  }, [page, fetchMovies]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loading]);

  useEffect(() => {
    setPage(1);
    fetchMovies(true);
  }, [debouncedQuery, selectedGenre, year, language, sort, fetchMovies]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedGenre(null);
    setYear('');
    setLanguage('');
    setSort('popularity.desc');
  };

  return (
    <Router>
      <WatchlistProvider>
        <div className={darkMode ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
          <Container className="py-4">
            <div className="d-flex justify-content-between mb-4 flex-wrap gap-2 align-items-center">
              <h1 className="mb-0">🎦 Movie Explorer</h1>
              <div className="d-flex gap-2">
                <Link to="/" className="btn btn-outline-primary">Home</Link>
                <Link to="/watchlist" className="btn btn-outline-success">Watchlist</Link>
                <Button variant={darkMode ? 'light' : 'dark'} onClick={() => setDarkMode(!darkMode)}>
                  Toggle {darkMode ? 'Light' : 'Dark'} Mode
                </Button>
              </div>
            </div>

            <Routes>
              <Route path="/watchlist" element={<Watchlist />} />
              <Route
                path="/"
                element={
                  <Home
                    query={query}
                    handleSearch={handleSearch}
                    clearFilters={clearFilters}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    year={year}
                    setYear={setYear}
                    language={language}
                    setLanguage={setLanguage}
                    sort={sort}
                    setSort={setSort}
                    movies={movies}
                    loading={loading}
                    loader={loader}
                    setSelectedMovie={setSelectedMovie}
                    selectedMovie={selectedMovie}
                  />
                }
              />
            </Routes>
          </Container>
        </div>
      </WatchlistProvider>
    </Router>
  );
};

export default App;
