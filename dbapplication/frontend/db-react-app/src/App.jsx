import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProduct from "./components/AddProduct";

export default function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow max-w-4xl mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/add" element={<AddProduct />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}
