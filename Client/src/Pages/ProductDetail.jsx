import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CartDrawer from '../Components/CartDrawer';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const { dispatch } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data.product);
        setError(null);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen"><Navbar /><div className="py-20 text-center">Loading...</div><Footer /></div>;
  if (error) return <div className="min-h-screen"><Navbar /><div className="py-20 text-center text-red-600">{error}</div><Footer /></div>;
  if (!product) return null;

  // For demo: support multiple images if product.imageUrls exists, else fallback to imageUrl
  const images = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [product.imageUrl];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center border">
            <img src={images[selectedImage]} alt={product.name} className="object-contain w-full h-full" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={product.name + ' ' + idx}
                  className={`w-16 h-16 object-cover rounded border cursor-pointer ${selectedImage === idx ? 'ring-2 ring-black' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          )}
        </div>
        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <div className="text-2xl font-bold text-black mb-4">LKR {product.price?.toLocaleString('en-LK')}</div>
          <div className="mb-4">
            <span className="font-semibold">Sizes:</span>
            <div className="flex gap-2 mt-2">
              {product.sizes?.map(size => (
                <button
                  key={size}
                  className={`px-3 py-1 rounded border font-semibold ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Category:</span> {product.category}
          </div>
          <button
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
            disabled={!selectedSize}
            onClick={() => {
              if (!selectedSize) return;
              dispatch({ type: 'ADD_ITEM', payload: { product, size: selectedSize } });
              setCartOpen(true);
            }}
          >
            {selectedSize ? 'Add to Cart' : 'Select Size'}
          </button>
        </div>
      </div>
      {/* Reviews Section */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {/* Placeholder for reviews */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        </div>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </div>
  );
};

export default ProductDetail;
