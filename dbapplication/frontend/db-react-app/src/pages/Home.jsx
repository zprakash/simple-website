import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="text-center mt-10">
            <h1 className="text-4xl font-bold text-blue-600">Welcome to Product Manager</h1>
            <p className="text-gray-600 mt-3">Easily manage your products with our simple interface.</p>
            <div className="mt-6 flex justify-center space-x-4">
                <Link to="/products" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
                    View Products
                </Link>
                <Link to="/add" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700">
                    Add Product
                </Link>
            </div>
        </div>
    );
}
