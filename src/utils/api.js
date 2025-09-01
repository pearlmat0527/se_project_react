// src/utils/api.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// --- helpers ---
const json = async (res) => {
  // try to parse JSON even on errors
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || res.statusText || "Request failed";
    const err = new Error(message);
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
};

const authHeaders = () => {
  const token = localStorage.getItem("jwt");
  return token ? { authorization: `Bearer ${token}` } : {};
};

// --- public endpoints (no auth) ---

// ✅ GET all clothing items (public) with id/_id normalization
export const getClothingItems = async () => {
  const res = await fetch(`${BASE_URL}/items`, {
    headers: { "Content-Type": "application/json" },
  });
  const data = await json(res);
  return data.map((item) => ({
    ...item,
    _id: item._id ?? item.id,
    id: item.id ?? item._id,
  }));
};
// --- protected endpoints (must send Bearer token) ---

// ✅ POST a new item (protected)
export const addClothingItem = async ({ name, imageUrl, weather }) => {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
  return json(res);
};

// ✅ DELETE an item by _id (protected)
export const deleteClothingItem = async (_id) => {
  const res = await fetch(`${BASE_URL}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  // many DELETEs return 200/204 w/o body — still run json() safely:
  try {
    return await json(res);
  } catch (e) {
    // If server returns 204 No Content, treat success
    if (e.status === 204) return true;
    throw e;
  }
}; // ← CLOSE the function here
// ✅ UPDATE current user (protected)
export const updateProfile = async ({ name, avatar }) => {
  const headers = {
    "Content-Type": "application/json",
    ...authHeaders(),
  };
  if (!headers.authorization) {
    const err = new Error("Not authenticated");
    err.status = 401;
    throw err;
  }

  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ name, avatar }),
  });
  return json(res); // expects updated user object
};

// ✅ LIKE an item (protected)
export const addCardLike = async (id) => {
  const res = await fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  return json(res); // → updated item
};

// ✅ UNLIKE an item (protected)
export const removeCardLike = async (id) => {
  const res = await fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  return json(res); // → updated item
};
