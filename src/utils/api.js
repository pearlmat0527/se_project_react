const baseUrl = "http://localhost:3001";

// ✅ GET all clothing items with id/_id normalization
export const getClothingItems = async () => {
  try {
    const res = await fetch(`${baseUrl}/items`);
    if (!res.ok) throw new Error("Failed to fetch items");

    const data = await res.json();

    const patched = data.map((item) => ({
      ...item,
      _id: item._id ?? item.id,
      id: item.id ?? item._id, // 👈 ensures DELETE endpoint works
    }));

    return patched;
  } catch (err) {
    console.error("[GET] Error:", err.message);
    throw err;
  }
};

// ✅ POST a new item
export const addClothingItem = async ({ name, imageUrl, weather }) => {
  const item = { name, imageUrl, weather };

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

// ✅ DELETE an item by _id with normalization
export const deleteClothingItem = async (_id) => {
  console.log(`[DELETE] Attempting to delete item with _id=${_id}`);
  try {
    const res = await fetch(`${baseUrl}/items/${_id}`, {
      method: "DELETE",
    });

    console.log(`[DELETE] Status: ${res.status}`);
    if (!res.ok) throw new Error(`Failed to delete item with _id=${_id}`);

    return true;
  } catch (err) {
    console.error("[DELETE] Error:", err.message);
    throw err;
  }
};
