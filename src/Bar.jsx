import React, { memo } from 'react';

const Bar = memo(({ userName, wishlistCount, toggleProfileOptions, showProfileOptions, showWishlistMovies, handleSearch, query, setQuery }) => (
  <div className="bar">
    <h1>Movie Recommendation System</h1>

    <div className="profile-button">
      <button onClick={toggleProfileOptions} className="profile-icon">
        <i className="fas fa-user"></i> PROFILE
      </button>
      {showProfileOptions && (
        <div className="profile-options">
          <p>Username: {userName}</p>
          <button onClick={showWishlistMovies}>Wishlist ({wishlistCount})</button>
        </div>
      )}
    </div>

    <form onSubmit={handleSearch} className="fo">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  </div>
));

export default Bar;
