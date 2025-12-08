import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CartDrawer from '../Components/CartDrawer';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Toaster position="top-right" />
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Images Section - 7 columns */}
          <div className="lg:col-span-7">
            <div className="sticky top-8 space-y-4">
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden group">
                <img 
                  src={images[selectedImage]} 
                  alt={product.name} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                        selectedImage === idx 
                          ? 'ring-2 ring-gray-900 ring-offset-2 scale-95' 
                          : 'hover:scale-95 opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Details Section - 5 columns */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <div className="inline-flex items-center px-3 py-1.5 bg-gray-100 rounded-full">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  LKR {product.price?.toLocaleString('en-LK')}
                </span>
                <span className="text-xs text-gray-500">Incl. taxes</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Select Size
                  </h3>
                  {selectedSize && (
                    <span className="text-xs text-gray-500">
                      Selected: <span className="font-bold text-gray-900">{selectedSize}</span>
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes?.map(size => (
                    <button
                      key={size}
                      className={`h-11 flex items-center justify-center text-xs font-bold rounded-lg transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-gray-900 text-white shadow-lg scale-105'
                          : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-900 hover:scale-105'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-gray-800 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  disabled={!selectedSize}
                  onClick={() => {
                    if (!selectedSize) {
                      toast.error('Please select a size first!');
                      return;
                    }
                    dispatch({ type: 'ADD_ITEM', payload: { product, size: selectedSize } });
                    toast.success(`${product.name} added to cart!`);
                    setCartOpen(true);
                  }}
                >
                  {selectedSize ? 'Add to Cart' : 'Please Select a Size'}
                </button>
                <button
                  className="w-full bg-white text-gray-900 px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wide border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-900"
                  disabled={!selectedSize}
                  onClick={() => {
                    if (!selectedSize) {
                      toast.error('Please select a size first!');
                      return;
                    }
                    dispatch({ type: 'ADD_ITEM', payload: { product, size: selectedSize } });
                    toast.success('Proceeding to checkout...');
                    setTimeout(() => navigate('/checkout'), 100);
                  }}
                >
                  Buy Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="pt-4 space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free shipping on orders over LKR 5,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Easy returns within 30 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Authentic products guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </div>
  );
};

export default ProductDetail;
