import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const query = useQuery().get('query') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    axios.get(`/api/products?search=${encodeURIComponent(query)}`)
      .then(res => {
        setProducts(res.data.products || []);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Failed to fetch products');
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
        {loading ? (
          <div className="py-12 text-center">Loading...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-600">{error}</div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center text-gray-600">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition block cursor-pointer focus:outline-none"
                tabIndex={0}
              >
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded mb-2" />
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="font-bold text-blue-600">LKR {(product.price).toLocaleString('en-LK')}</div>
                <div className="text-xs text-gray-500 mt-1">{product.category} | Sizes: {product.sizes && product.sizes.join(', ')}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Search;
