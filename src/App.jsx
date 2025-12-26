import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Bar from './Bar';
const API_KEY = '1b55383e2748cce7a97aa7716e9ee064';
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const userName = localStorage.getItem('userName') || 'Guest';
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('wishlist')) || []
  );

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

  function fetchGenres() {
    axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY, language: 'en-US' },
    })
    .then((response) => {
      setGenres(response.data.genres);
    })
    .catch(() => {
      setError('Failed to fetch genres.');
    });
  }

  function fetchMovies(genreId = null) {
    setLoading(true);
    setError(null);
    const params = {
      api_key: API_KEY,
      language: 'en-US',
      sort_by: 'popularity.desc',
      page: 1,
      certification_country: 'US',
      certification_lte: 'PG-13',
      include_adult: false,
      with_genres: genreId || ''
    };

    axios.get(`${BASE_URL}/discover/movie`, { params })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch(() => {
        setError('Failed to fetch movies. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSearch(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: 'en-US',
        page: 1,
        certification_country: 'US',
        certification_lte: 'PG-13',
        include_adult: false,
      },
    })
    .then((response) => {
      setMovies(response.data.results);
    })
    .catch(() => {
      setError('Error searching movies. Please try again later.');
    })
    .finally(() => {
      setLoading(false);
    });
  }

  function addToWishlist(id) {
    let updatedWishlist = [...wishlist];
    if (!updatedWishlist.includes(id)) {
      updatedWishlist.push(id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);
      alert("Added to wishlist!");
    } else {
      alert("Already in wishlist!");
    }
  }

  // Toggle profile options
  function toggleProfileOptions() {
    setShowProfileOptions(!showProfileOptions);
  }

  // Show wishlist
  function showWishlistMovies() {
    setShowWishlist(true);
    setShowProfileOptions(false);
  }

  return (
    <div className="app">
       <Bar
        userName={userName}
        wishlistCount={wishlist.length}
        toggleProfileOptions={toggleProfileOptions}
        showProfileOptions={showProfileOptions}
        showWishlistMovies={showWishlistMovies}
        handleSearch={handleSearch}
        query={query}
        setQuery={setQuery}
      />

      <div className="main-container">
        {showWishlist ? (
          <div className="movies-wish">
            <h3>Your Wishlist</h3>
            {wishlist.length === 0 ? (
              <p>Your wishlist is empty.</p>
            ) : (
              <div className="wish-grid">
                {movies
                  .filter((movie) => wishlist.includes(movie.id))
                  .map((movie) => (
                    <div key={movie.id} className="wish-card">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <h3>{movie.title}</h3>
                      <p>Rating: {movie.vote_average}</p>
                      <p>Release: {movie.release_date}</p>
                    </div>
                  ))
                }
              </div>
            )}
            <br />
            <button onClick={() => setShowWishlist(false)}>Back to All Movies</button>
          </div>
        ) : (
          <>
            <div className="genres-list">
              <h3 className='gen'>Genres</h3>
              <ul>
                {genres.map((genre) => (
                  <li
                    key={genre.id}
                    onClick={() => {
                      setSelectedGenre(genre.id);
                      fetchMovies(genre.id);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="movies-container">
              {loading ? (
                <p>Loading movies...</p>
              ) : error ? (
                <p className="error">{error}</p>
              ) : (
                <div className="movie-grid">
                  {movies.length === 0 ? (
                    <p>No movies found.</p>
                  ) : (
                    movies.map((movie) => (
                      <div key={movie.id} className="movie-card">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                        />
                        <h3>{movie.title}</h3>
                        <button onClick={() => addToWishlist(movie.id)} style={{ fontSize: '0.8em' }}>
                          <i className="fas fa-heart"></i>
                        </button>
                        <p>Rating: {movie.vote_average}</p>
                        <p>Release: {movie.release_date}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
