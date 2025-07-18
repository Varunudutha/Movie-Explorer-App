import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import { WatchlistProvider } from './context/WatchlistContext';
import { genres } from './data/genres';

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

  // Debounce query input to reduce API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  // Fetch movies helper
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
        // Search endpoint when query exists
        url = 'https://api.themoviedb.org/3/search/movie';
        params.query = debouncedQuery;
      } else {
        // Show popular movies when no query
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

  // Fetch on page changes except initial (handled on filters/search change)
  useEffect(() => {
    if (page === 1) return;
    fetchMovies();
  }, [page, fetchMovies]);

  // Intersection Observer for infinite scroll
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

  // Reset movies and fetch when filters change or search changes
  useEffect(() => {
    setPage(1);
    fetchMovies(true);
  }, [debouncedQuery, selectedGenre, year, language, sort, fetchMovies]);

  // Handle search input changes
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  // Clear filters and search
  const clearFilters = () => {
    setQuery('');
    setSelectedGenre(null);
    setYear('');
    setLanguage('');
    setSort('popularity.desc');
  };

  return (
    <WatchlistProvider>
      <div className={darkMode ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
        <Container className="py-4">
          <h1 className="mb-4 text-center">Ⓜ️ MovieFlix</h1>

          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <SearchBar query={query} onSearch={handleSearch} />
            <Button variant="secondary" onClick={clearFilters}>Clear Filters</Button>
            <Button variant={darkMode ? 'light' : 'dark'} onClick={() => setDarkMode(!darkMode)}>
              Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </Button>
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
                <Form.Select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                >
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
                <Form.Select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                >
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
        </Container>
      </div>
    </WatchlistProvider>
  );
};

export default App;
