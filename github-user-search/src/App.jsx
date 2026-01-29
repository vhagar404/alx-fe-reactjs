// src/App.jsx
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import { searchUsers } from './services/githubService';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchUsers(query);
      setUsers(data.items || []);
    } catch (err) {
      setError('Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>GitHub User Search</h1>
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="loading">Searching...</p>}
      {error && <p className="error">{error}</p>}

      <div className="user-grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {users.length === 0 && !loading && !error && (
        <p className="placeholder">Search for GitHub users above</p>
      )}
    </div>
  );
}

export default App;


