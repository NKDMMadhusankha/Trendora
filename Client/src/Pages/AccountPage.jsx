import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, Calendar, ShoppingBag } from 'lucide-react';
import Navbar from '../Components/Navbar';

export default function AccountPage() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    const token = localStorage.getItem('token');
    axios.get('/api/orders/my', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setOrders(res.data.orders || []);
    }).catch(err => {
      console.error('Failed to fetch orders:', err);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Account Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Account</h1>
          {user && (
            <p className="text-gray-600">{user.fullName} • {user.email}</p>
          )}
        </div>

        {/* Order History */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id} className="border border-gray-200 rounded-lg p-5">
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order Number</p>
                      <p className="text-lg font-bold text-blue-600">{order.orderNumber || order._id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-900">
                          {new Date(order.orderDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">Items</p>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded">
                          {item.product?.imageUrl ? (
                            <img
                              src={item.product.imageUrl}
                              alt={item.product?.name || 'Product'}
                              className="w-32 h-32 object-cover rounded flex-shrink-0 border"
                            />
                          ) : (
                            <Package className="w-12 h-12 text-gray-400 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.product?.name || 'Product'}</p>
                            <p className="text-xs text-gray-500">Size: {item.size} • Quantity: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Total</p>
                      <p className="text-lg font-bold text-gray-900">LKR {order.totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
