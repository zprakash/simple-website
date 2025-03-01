import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-blue-500 text-white p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link to="/">Product Manager</Link>
                </h1>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    <li><Link to="/products" className="hover:underline">View Products</Link></li>
                    <li><Link to="/add" className="hover:underline">Add Product</Link></li>
                </ul>
            </div>
        </nav>
    );
}
