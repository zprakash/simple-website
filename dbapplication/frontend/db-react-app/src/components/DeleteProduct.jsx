export default function DeleteProduct({ product, onDelete }) {
    return (
        <button 
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => onDelete(product.id)}
        >
            Delete
        </button>
    );
}
