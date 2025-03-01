import DeleteProduct from "./DeleteProduct";

export default function ProductCard({ product, onDelete }) {
    return (
        <div className="border p-4 shadow-lg bg-white rounded-lg">
            <h2 className="text-xl font-bold">{product.product_name}</h2>
            <p className="text-gray-600">${product.product_price}</p>
            <p className="text-sm text-gray-500">{product.product_description}</p>
            <DeleteProduct product={product} onDelete={onDelete} />
        </div>
    );
}
