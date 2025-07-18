import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import { WatchlistProvider } from './context/WatchlistContext';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [year, setYear] = useState('');
  const [sort, setSort] = useState('popularity.desc');
  const [darkMode, setDarkMode] = useState(false);
  const loader = useRef(null);

  const [topTollywood, setTopTollywood] = useState([]);
const [topNetflix, setTopNetflix] = useState([]);
const [topPopular, setTopPopular] = useState([]);


  const fetchMovies = async (reset = false) => {
    if (!query) return;
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          query,
          page,
          primary_release_year: year || undefined,
          sort_by: sort,
        }
      });

      if (reset) {
        setMovies(res.data.results);
      } else {
        setMovies((prev) => [...prev, ...res.data.results]);
      }
    } catch (err) {
      console.error('Error fetching movies', err);
    }
  };

  useEffect(() => {
    fetchMovies(true);
  }, [sort, year]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, []);

  useEffect(() => {
    if (page > 1) fetchMovies();
  }, [page]);

  return (
    <WatchlistProvider>
      <div className={darkMode ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
        <Container className="py-4">
          <h1 className="mb-4 text-center">🎬 Movie Explorer</h1>
          <Button variant={darkMode ? 'light' : 'dark'} onClick={() => setDarkMode(!darkMode)}>
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </Button>

          <SearchBar
            query={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={(e) => {
              e.preventDefault();
              setPage(1);
              fetchMovies(true);
            }}
          />

          <Row className="mt-3">
            <Col md={4}>
              <Form.Group controlId="year">
                <Form.Label>Filter by Year</Form.Label>
                <Form.Control type="number" placeholder="e.g. 2020" value={year} onChange={(e) => setYear(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="sort">
                <Form.Label>Sort by</Form.Label>
                <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="popularity.desc">Popularity Desc</option>
                  <option value="popularity.asc">Popularity Asc</option>
                  <option value="vote_average.desc">Rating Desc</option>
                  <option value="vote_average.asc">Rating Asc</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-4" xs={1} sm={2} md={3} lg={4}>
            {movies.map(movie => (
              <Col key={movie.id} className="mb-4">
                <MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
              </Col>
            ))}
          </Row>

          <div ref={loader}></div>

          {selectedMovie && (
            <MovieModal
              show={!!selectedMovie}
              movie={selectedMovie}
              onHide={() => setSelectedMovie(null)}
            />
          )}
        </Container>
      </div>
    </WatchlistProvider>
  );
};

export default App;
