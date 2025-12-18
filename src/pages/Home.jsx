import React, { useEffect, useState } from 'react';
import tmdb from '../services/tmdbApi';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';

const Home = () => {
    // We will fetch Hero movie specifically or use Trending[0]
    const [heroMovie, setHeroMovie] = useState(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                // Get Trending for Hero
                const response = await tmdb.getTrending();
                const results = response.data.results;
                // Randomize hero from top 5 trending
                const random = Math.floor(Math.random() * 5);
                setHeroMovie(results[random]);
            } catch (error) {
                console.error("Error fetching hero:", error);
            }
        };
        fetchHero();
    }, []);

    return (
        <div className="home-page" style={{ paddingBottom: '50px', backgroundColor: '#141414', minHeight: '100vh' }}>
            {/* 1. Hero Banner */}
            <HeroBanner movie={heroMovie} />

            <div style={{ marginTop: '0px', position: 'relative', zIndex: 10 }}>
                {/* 2. Horizontal Rows / Categories */}

                {/* Trending Now */}
                <MovieRow
                    title="Trending Now"
                    fetchFn={() => tmdb.getTrending({ page: 1 })}
                    isLargeRow
                />

                {/* Top 10 Series */}
                <MovieRow
                    title="Top 10 Series in CineVerse"
                    fetchFn={() => tmdb.getTopSeries({ page: 1 })}
                />

                {/* Futuristic Sci-Fi */}
                <MovieRow
                    title="Futuristic Sci-Fi"
                    fetchFn={() => tmdb.getSciFi({ page: 1 })}
                />

                {/* Award-Winning Films */}
                <MovieRow
                    title="Award-Winning Films"
                    fetchFn={() => tmdb.getAwardWinning({ page: 1 })}
                />

                {/* Anime */}
                <MovieRow
                    title="Anime"
                    fetchFn={() => tmdb.getAnime({ page: 1 })}
                />

                {/* US TV Shows */}
                <MovieRow
                    title="US TV Shows"
                    fetchFn={() => tmdb.getUSTV({ page: 1 })}
                />

                {/* International TV Shows */}
                <MovieRow
                    title="International TV Shows"
                    fetchFn={() => tmdb.getInternationalTV({ page: 1 })}
                />

                {/* Fantasy */}
                <MovieRow
                    title="Fantasy Worlds"
                    fetchFn={() => tmdb.getFantasy({ page: 1 })}
                />

                {/* Asian TV Shows */}
                <MovieRow
                    title="Asian TV Shows"
                    fetchFn={() => tmdb.getAsianTV({ page: 1 })}
                />

                {/* Top Rated (General) */}
                <MovieRow
                    title="Critically Acclaimed Movies"
                    fetchFn={() => tmdb.getMoviesList('top_rated', { page: 1 })}
                />

                {/* Dangerous Escape (Action + Thriller + Custom Keyword 'Prison' or just Action/Thriller combo) 
                    For now, let's just do Action + Thriller combination */}
                <MovieRow
                    title="Adrenaline Rush"
                    fetchFn={() => tmdb.discover({ with_genres: '28,53', sort_by: 'popularity.desc' })}
                />
            </div>
        </div>
    );
};

export default Home;
