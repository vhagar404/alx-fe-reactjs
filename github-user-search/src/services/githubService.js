import axios from 'axios';

const BASE_URL = 'https://api.github.com';
const PER_PAGE = 12; // reasonable for UI

/**
 * Search GitHub users with advanced filters
 * @param {Object} params
 * @param {string} [params.keyword=''] - username, name, etc.
 * @param {string} [params.location=''] - location string
 * @param {number} [params.minRepos=0] - minimum public repositories
 * @param {number} [params.page=1] - pagination page
 * @returns {Promise<{users: Array, totalCount: number, hasMore: boolean}>}
 */
export const searchUsers = async ({ keyword = '', location = '', minRepos = 0, page = 1 }) => {
  let query = [];

  if (keyword.trim()) query.push(keyword.trim());
  if (location.trim()) query.push(`location:${location.trim()}`);
  if (minRepos > 0) query.push(`repos:>${minRepos}`);

  const q = query.join(' ').trim() || 'type:user'; // fallback to show some users

  try {
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: {
        q,
        page,
        per_page: PER_PAGE,
      },
    });

    const { items, total_count, incomplete_results } = response.data;

    return {
      users: items,
      totalCount: total_count,
      hasMore: page * PER_PAGE < total_count && !incomplete_results,
    };
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('Rate limit exceeded. Try again later or add GitHub token.');
    }
    if (error.response?.status === 422) {
      throw new Error('Invalid search query. Please adjust filters.');
    }
    throw new Error('Failed to search users. Please try again.');
  }
};

// Optional: keep single user fetch if needed elsewhere
export const fetchUserData = async (username) => {
  const res = await axios.get(`${BASE_URL}/users/${username}`);
  return res.data;
};