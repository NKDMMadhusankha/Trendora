import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const OrderProfileView = () => {
  const orders = [
    {
      id: 'ORD-2024-001',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      productName: 'Premium Wireless Headphones',
      price: 149.99,
      description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
      size: 'Standard',
      orderedDate: '2024-12-01',
      deliveryDate: '2024-12-08',
      status: 'Delivered'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Orders</h1>
          
          {orders.length === 0 ? (
            <div className="bg-zinc-900 rounded-lg p-12 text-center">
              <p className="text-xl font-semibold mb-2">No orders yet</p>
              <p className="text-gray-400">Go to store to place an order.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-zinc-900 rounded-lg p-6 hover:bg-zinc-800 transition-colors">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={order.image} 
                        alt={order.productName}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* Order Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{order.productName}</h3>
                          <p className="text-gray-400 text-sm mb-2">Order ID: {order.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">${order.price}</p>
                          <span className="inline-block mt-1 px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">{order.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400 mb-1">Size</p>
                          <p className="text-white font-medium">{order.size}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Ordered Date</p>
                          <p className="text-white font-medium">
                            {new Date(order.orderedDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Delivery Date</p>
                          <p className="text-white font-medium">
                            {new Date(order.deliveryDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderProfileView;