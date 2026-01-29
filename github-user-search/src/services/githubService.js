import axios from "axios";

const BASE_URL = "https://api.github.com";

/**
 * Advanced search using GitHub Search API
 * Example:
 * https://api.github.com/search/users?q=octocat+location:Nigeria+repos:>=10
 */
export const searchUsers = async (
  username,
  location,
  minRepos,
  page = 1
) => {
  let query = username;

  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}`;

  const response = await axios.get(url, {
    params: {
      page,
      per_page: 12,
    },
  });

  return response.data;
};

export const getUserDetails = async (username) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}`
  );
  return response.data;
};

