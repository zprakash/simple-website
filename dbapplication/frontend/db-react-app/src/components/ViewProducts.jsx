import { useState, useEffect } from "react";
import EditProduct from "./EditProduct";

export default function ViewProducts() {
    const [products, setProducts] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3000/delete/${id}`, { method: "DELETE" });

        if (response.ok) {
            setDeleteSuccess(true);
            setProducts(products.filter(product => product.id !== id));

            // Hide success message after 2 seconds
            setTimeout(() => setDeleteSuccess(false), 2000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">

            {deleteSuccess && (
                <div className="bg-red-500 text-white p-2 rounded-md mb-3 text-center">
                    ❌ Product deleted successfully!
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg p-5">
                {products.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="text-center">
                                    <td className="border p-2">{product.id}</td>
                                    <td className="border p-2">{product.product_name}</td>
                                    <td className="border p-2">${product.product_price}</td>
                                    <td className="border p-2">{product.product_description}</td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            onClick={() => setEditProduct(product)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No products available.</p>
                )}
            </div>

            {/* Show Edit Form Popup */}
            {editProduct && (
                <EditProduct product={editProduct} onClose={() => setEditProduct(null)} refreshProducts={fetchProducts} />
            )}
        </div>
    );
}
