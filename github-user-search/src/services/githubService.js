import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Fetches GitHub user data by username
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data or throws error
 */
export const fetchUserData = async (username) => {
  if (!username.trim()) {
    throw new Error('Please enter a username');
  }

  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data. Please try again.');
  }
};