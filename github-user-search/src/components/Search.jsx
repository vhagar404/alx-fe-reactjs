import { useState } from 'react';
import { searchUsers } from '../services/githubService';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchResults = async (newPage = 1, append = false) => {
    setLoading(true);
    setError('');

    try {
      const { users, totalCount: count, hasMore: more } = await searchUsers({
        keyword,
        location,
        minRepos: minRepos ? Number(minRepos) : 0,
        page: newPage,
      });

      setResults((prev) => (append ? [...prev, ...users] : users));
      setTotalCount(count);
      setHasMore(more);
      setPage(newPage);
    } catch (err) {
      setError(err.message || 'Looks like we cant find any users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchResults(1, false);
  };

  const handleLoadMore = () => {
    fetchResults(page + 1, true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        GitHub User Search
      </h1>

      <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-lg mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keyword / Username
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. john, react developer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Lagos, Nigeria, Berlin"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Repositories
            </label>
            <input
              type="number"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="e.g. 50"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Searching...' : 'Search Users'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <p className="text-red-600 bg-red-50 p-4 rounded-lg text-center mb-6">
          {error}
        </p>
      )}

      {loading && results.length === 0 && (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      )}

      {results.length > 0 && (
        <>
          <p className="text-center text-gray-600 mb-6">
            Found <strong>{totalCount.toLocaleString()}</strong> users
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    className="w-24 h-24 rounded-full mb-4 border-4 border-gray-100"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {user.login}
                  </h3>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-1 block"
                  >
                    View Profile →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition disabled:bg-gray-400"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && results.length === 0 && keyword && (
        <p className="text-center text-gray-500 text-lg">
          No users found. Try different filters.
        </p>
      )}
    </div>
  );
};

export default Search;