import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Category from '../Components/Category'
import Review from '../Components/Review'
import Footer from '../Components/Footer'
import { ArrowRight } from 'lucide-react'
import h1 from '../Images/h1.jpg'
import h2 from '../Images/h2.jpg'
import h3 from '../Images/h3.jpg'
import h4 from '../Images/h4.jpg'
import h5 from '../Images/h5.jpg'
import h6 from '../Images/h6.jpg'
import h7 from '../Images/h7.jpg'
import h8 from '../Images/h8.jpg'

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when HomePage mounts
    const fetchBestSellers = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        // Filter for men and women, then take top 4 of each
        const menProducts = data.products.filter(p => p.category?.toLowerCase().includes('men')).slice(0, 4);
        const womenProducts = data.products.filter(p => p.category?.toLowerCase().includes('women')).slice(0, 4);
        setProducts([...menProducts, ...womenProducts]);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  return (
    <div>
        <Navbar />
        <Banner />
        
        {/* Best Sellers Section */}
        <div className="max-w-full mx-auto px-20 py-12">
          <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 'bold' }}>BEST SELLERS</h2>
          
          {loading ? (
            <div className="py-12 text-center">Loading...</div>
          ) : error ? (
            <div className="py-12 text-center text-red-600">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {products.map((product) => (
                <div 
                  key={product._id} 
                  className="cursor-pointer group"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 mb-4">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-[33rem] object-cover transition duration-300 group-hover:brightness-50 group-hover:blur-sm"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <button className="bg-black bg-opacity-80 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg">View Item</button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-2 line-clamp-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>{product.name}</h3>
                    <p className="text-gray-900 font-bold" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
                      LKR {product.price?.toLocaleString('en-LK')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View Collection Button */}
          <div className="flex justify-left mt-12">
            <button className="bg-black text-white px-10 py-3 rounded-lg font-bold text-lg flex items-center gap-2">
              View Collection
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Category />
        <Review />
        <Footer />
    </div>
  )
}

export default HomePage
