const baseUrl = "http://localhost:3001";

// GET all clothing items
export const getClothingItems = async () => {
  console.log(`[GET] Fetching from: ${baseUrl}/items`);
  try {
    const res = await fetch(`${baseUrl}/items`);
    console.log(`[GET] Status: ${res.status}`);
    if (!res.ok) throw new Error("Failed to fetch items");
    const data = await res.json();
    console.log("[GET] Items fetched:", data);
    return data;
  } catch (err) {
    console.error("[GET] Error:", err.message);
    throw err;
  }
};

// POST a new item
export const addClothingItem = async ({ name, image, weather }) => {
  const item = {
    name,
    imageUrl: image, // 🔄 Server expects imageUrl
    weather,
  };

  console.log("[POST] Adding:", item);

  try {
    const res = await fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    console.log(`[POST] Status: ${res.status}`);
    if (!res.ok) throw new Error("Failed to add item");
    const data = await res.json();
    console.log("[POST] Added:", data);
    return data;
  } catch (err) {
    console.error("[POST] Error:", err.message);
    throw err;
  }
};

// DELETE an item
export const deleteClothingItem = async (id) => {
  console.log(`[DELETE] Attempting to delete: ${baseUrl}/items/${id}`);
  try {
    const res = await fetch(`${baseUrl}/items/${id}`, {
      method: "DELETE",
    });
    console.log(`[DELETE] Status: ${res.status}`);
    if (!res.ok)
      throw new Error(`Failed to delete item. Status: ${res.status}`);
    return true;
  } catch (err) {
    console.error("[DELETE] Error:", err.message);
    throw err;
  }
};
