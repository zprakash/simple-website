import { useState } from "react";

export default function AddProduct() {
    const [product, setProduct] = useState({ product_name: "", product_price: "", product_description: "" });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            setShowSuccess(true);
            setProduct({ product_name: "", product_price: "", product_description: "" });

            // Hide success message after 2 seconds
            setTimeout(() => setShowSuccess(false), 2000);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Add New Product</h2>

            {showSuccess && (
                <div className="bg-green-500 text-white p-2 rounded-md mb-3 text-center">
                    ✅ Product added successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="product_name" placeholder="Product Name" value={product.product_name} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="number" name="product_price" placeholder="Product Price" value={product.product_price} onChange={handleChange} className="w-full p-2 border rounded" required />
                <textarea name="product_description" placeholder="Product Description" value={product.product_description} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
                
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
                    Add Product
                </button>
            </form>
        </div>
    );
}
