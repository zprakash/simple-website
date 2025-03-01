import { useState } from "react";

export default function EditProduct({ product, onClose, refreshProducts }) {
    const [updatedProduct, setUpdatedProduct] = useState({
        product_name: product.product_name,
        product_price: product.product_price,
        product_description: product.product_description,
    });

    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleChange = (e) => {
        setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/update/${product.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            setUpdateSuccess(true);

            // Refresh product list
            refreshProducts();

            // Hide success message and close after 2 seconds
            setTimeout(() => {
                setUpdateSuccess(false);
                onClose();
            }, 1500);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Edit Product</h2>

                {updateSuccess && (
                    <div className="bg-green-500 text-white p-2 rounded-md mb-3 text-center">
                        ✅ Product updated successfully!
                    </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-4">
                    <input type="text" name="product_name" value={updatedProduct.product_name} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="number" name="product_price" value={updatedProduct.product_price} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <textarea name="product_description" value={updatedProduct.product_description} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
                    
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Update
                        </button>
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
