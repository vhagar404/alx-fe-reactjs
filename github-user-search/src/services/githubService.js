// src/services/githubService.js
import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

// Optional: Add token for higher rate limit (recommended)
const token = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(token && { Authorization: `token ${token}` }),
  },
});

/**
 * Search GitHub users by username/login
 * @param {string} query - search term (e.g. "octocat")
 * @param {number} page - pagination page (default 1)
 */
export const searchUsers = async (query, page = 1) => {
  try {
    const response = await api.get('/search/users', {
      params: { q: query, page, per_page: 12 },
    });
    return response.data; // { total_count, incomplete_results, items: [...] }
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

/**
 * Get detailed info for a single user
 * @param {string} username
 */
export const getUser = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};

export default api;