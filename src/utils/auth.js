// src/utils/auth.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const handle = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(data?.message || res.statusText || "Request failed");
  return data;
};

export const signup = ({ name, avatar, email, password }) =>
  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handle);

export const signin = ({ email, password }) =>
  fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handle);

// token check: GET /users/me with Bearer
export const getMe = (token) =>
  fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handle);
