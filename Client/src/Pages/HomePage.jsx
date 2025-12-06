import React from 'react'
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
  const products = [
    {
      id: 1,
      name: 'The Vault Hoodie',
      price: 'Rs 5,250',
      image: h1,
      isNew: true
    },
    {
      id: 2,
      name: 'Fearless Hoodie - Unisex',
      price: 'Rs 6,250',
      image: h2,
      isNew: true
    },
    {
      id: 3,
      name: 'Essence Washed Oversize Tee',
      price: 'Rs 6,550',
      image: h3,
      isNew: true
    },
    {
      id: 4,
      name: 'Premium Apex Legging',
      price: 'Rs 7,300',
      image: h4,
      isNew: true
    },
    {
      id: 5,
      name: 'Sprintline Track Pant',
      price: 'Rs 6,800',
      image: h5,
      isNew: false
    },
    {
      id: 6,
      name: 'Vintage Oversized Tee',
      price: 'Rs 5,100',
      image: h6,
      isNew: false
    },
    {
      id: 7,
      name: 'Classic Dreamer Shirt',
      price: 'Rs 4,500',
      image: h7,
      isNew: false
    },
    {
      id: 8,
      name: 'Velocity Elite Shorts',
      price: 'Rs 3,900',
      image: h8,
      isNew: false
    }
  ];

  return (
    <div>
        <Navbar />
        <Banner />
        
        {/* Best Sellers Section */}
        <div className="max-w-full mx-auto px-20 py-12">
          <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 'bold' }}>BEST SELLERS</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 mb-4">
                  {product.isNew && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <span className="text-lg">⚡</span> New
                      </span>
                    </div>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-[33rem] object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="font-bold text-sm mb-2 line-clamp-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>{product.name}</h3>
                  <p className="text-gray-900 font-bold" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>{product.price}</p>
                </div>
              </div>
            ))}
          </div>

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
