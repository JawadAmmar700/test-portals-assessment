import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const addToBasket = (product) => {
    setBasket((prev) => [...prev, product]);
  };

  const total = basket.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        const res = await fetch("http://localhost:3099/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const json = await res.json();
        setProducts(json || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-center px-4">
        <div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Basket Button */}
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white shadow-md z-10 p-4 rounded-lg">
          <h1 className="text-3xl font-bold">🛍️ Explore Products</h1>
          <button
            onClick={() => setIsBasketOpen(true)}
            className="relative bg-white shadow-2xl cursor-pointer  px-4 py-2 rounded-md text-black  transition flex items-center gap-2"
          >
            🛒 Basket
            {basket.length > 0 && (
              <span className="text-xs font-bold text-black flex items-center justify-center">
                {basket.length}
              </span>
            )}
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <button
                onClick={() => addToBasket(product)}
                className="mt-auto cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Add to Basket
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Basket Modal */}
      {isBasketOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs "
          onClick={() => setIsBasketOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-11/12 max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsBasketOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4">🧺 Your Basket</h2>

            {basket.length === 0 ? (
              <p className="text-gray-500">Your basket is empty.</p>
            ) : (
              <div>
                <ul className="divide-y divide-gray-200 mb-4 max-h-60 overflow-y-auto">
                  {basket.map((item, idx) => (
                    <li key={idx} className="py-2 flex justify-between">
                      <span className="text-sm">{item.title}</span>
                      <span className="text-sm text-gray-700">
                        ${item.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-medium mb-4">
                  <span>Total:</span>
                  <span className="text-blue-600">${total}</span>
                </div>
                <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
                  Checkout
                </button>
                <button
                  onClick={() => setBasket([])}
                  className="w-full cursor-pointer bg-red-600 hover:bg-red-700 mt-5 text-white py-2 rounded-md transition"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
