import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Search GitHub users with filters (for advanced search)
 * @param {string} query - The full search query string (e.g. "john location:lagos repos:>10")
 * @param {number} [page=1]
 * @returns {Promise<{items: Array, total_count: number}>}
 */
export const searchUsers = async (query, page = 1) => {
  if (!query.trim()) {
    throw new Error('Search query is required');
  }

  try {
    const response = await axios.get(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}`, {
      params: {
        page,
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded');
    }
    throw new Error('Failed to search users');
  }
};

// Optional: Keep single user fetch if needed for other parts
export const fetchUserData = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
};