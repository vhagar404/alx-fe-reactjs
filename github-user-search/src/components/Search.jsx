import { useState } from 'react';
import { fetchUserData } from '../services/githubService';
import './Search.css'; // optional styling

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUser(null);

    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    setLoading(true);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      setError(err.message || 'Looks like we can\'t find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1>GitHub User Search</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username (e.g. octocat)"
          className="search-input"
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error-message">{error}</p>}

      {user && !loading && !error && (
        <div className="user-card">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="user-avatar"
            width={120}
            height={120}
          />
          <div className="user-info">
            <h2>{user.name || user.login}</h2>
            <p className="username">@{user.login}</p>
            {user.bio && <p className="bio">{user.bio}</p>}
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-link"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;