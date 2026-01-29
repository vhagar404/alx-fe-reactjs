import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

export const searchUsers = async (
  username,
  location,
  minRepos,
  page = 1
) => {
  let query = username;

  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const response = await api.get("/search/users", {
    params: {
      q: query,
      page,
      per_page: 12,
    },
  });

  return response.data;
};

export const getUserDetails = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};
