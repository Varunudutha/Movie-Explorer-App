import axios from 'axios';

const api_key = process.env.REACT_APP_TMDB_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: api_key,
  },
});

export const movieType = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
};

// Genre IDs and helper constants
export const genre = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  scifi: 878,
  tv_movie: 10770,
  thriller: 53,
  war: 10752,
  western: 37,
};

// TV Genres
export const tvGenre = {
  action_adventure: 10759,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  kids: 10762,
  mystery: 9648,
  news: 10763,
  reality: 10764,
  scifi_fantasy: 10765,
  soap: 10766,
  talk: 10767,
  war_politics: 10768,
  western: 37,
};

const tmdb = {
  getMoviesList: (type, params) => {
    const url = 'movie/' + movieType[type];
    return tmdbApi.get(url, { params });
  },
  getTrending: (params) => {
    const url = 'trending/movie/day';
    return tmdbApi.get(url, { params });
  },
  getTrendingTV: (params) => {
    const url = 'trending/tv/day';
    return tmdbApi.get(url, { params });
  },
  getVideos: (id, params = {}) => {
    const url = 'movie/' + id + '/videos';
    return tmdbApi.get(url, { params });
  },
  search: (query, params) => {
    const url = 'search/movie';
    return tmdbApi.get(url, { params: { ...params, query } });
  },
  detail: (id, params) => {
    const url = 'movie/' + id;
    return tmdbApi.get(url, { params });
  },
  credits: (id) => {
    const url = 'movie/' + id + '/credits';
    return tmdbApi.get(url, { params: {} });
  },
  similar: (id) => {
    const url = 'movie/' + id + '/similar';
    return tmdbApi.get(url, { params: {} });
  },
  discover: (params) => {
    const url = 'discover/movie';
    return tmdbApi.get(url, { params });
  },
  discoverTV: (params) => {
    const url = 'discover/tv';
    return tmdbApi.get(url, { params });
  },
  // Specific Category Helpers
  getSciFi: (params) => {
    return tmdbApi.get('discover/movie', {
      params: { ...params, with_genres: genre.scifi, sort_by: 'popularity.desc' }
    });
  },
  getAnime: (params) => {
    return tmdbApi.get('discover/tv', {
      params: { ...params, with_genres: tvGenre.animation, with_original_language: 'ja', sort_by: 'popularity.desc' }
    });
  },
  getFantasy: (params) => {
    return tmdbApi.get('discover/movie', {
      params: { ...params, with_genres: genre.fantasy, sort_by: 'popularity.desc' }
    });
  },
  getAwardWinning: (params) => {
    // Highly rated movies
    return tmdbApi.get('discover/movie', {
      params: { ...params, sort_by: 'vote_average.desc', 'vote_count.gte': 1000 }
    });
  },
  getAsianTV: (params) => {
    // Logic: original languages like ko, ja, zh
    return tmdbApi.get('discover/tv', {
      params: { ...params, with_original_language: 'ko|zh|ja', sort_by: 'popularity.desc' }
    });
  },
  getUSTV: (params) => {
    return tmdbApi.get('discover/tv', {
      params: { ...params, with_origin_country: 'US', sort_by: 'popularity.desc' }
    });
  },
  getInternationalTV: (params) => {
    // Just general TV ignoring US
    return tmdbApi.get('discover/tv', {
      params: { ...params, without_origin_country: 'US', sort_by: 'popularity.desc' }
    });
  },
  getTopSeries: (params) => {
    return tmdbApi.get('tv/top_rated', { params });
  }
};

export default tmdb;
