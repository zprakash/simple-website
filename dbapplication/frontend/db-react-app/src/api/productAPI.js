const BASE_URL = "http://localhost:3000";

export const fetchProducts = async () => {
    const res = await fetch(`${BASE_URL}/products`);
    return res.json();
};

export const addProduct = async (product) => {
    const res = await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    return res.json();
};

export const updateProduct = async (id, product) => {
    const res = await fetch(`${BASE_URL}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    return res.json();
};

export const deleteProduct = async (id) => {
    await fetch(`${BASE_URL}/delete/${id}`, { method: "DELETE" });
};
