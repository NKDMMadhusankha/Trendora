import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
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
                  className={`w-16 h-16 object-cover rounded border cursor-pointer ${selectedImage === idx ? 'ring-2 ring-blue-500' : ''}`}
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
          <div className="text-2xl font-bold text-blue-700 mb-4">LKR {product.price?.toLocaleString('en-LK')}</div>
          <div className="mb-4">
            <span className="font-semibold">Sizes:</span> {product.sizes?.join(', ')}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Category:</span> {product.category}
          </div>
          {/* Add to Cart button placeholder */}
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Add to Cart</button>
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
      <Footer />
    </div>
  );
};

export default ProductDetail;
