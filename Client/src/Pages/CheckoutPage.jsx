import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, User, Calendar, CreditCard, Package, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, dispatch, clearCartBackend } = useCart();
  const [user, setUser] = useState(null);
  const [orderDate, setOrderDate] = useState(new Date());
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [placingOrder, setPlacingOrder] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));

    // Check for selected items in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('selected') === '1') {
      const selected = localStorage.getItem('selectedBuyItems');
      if (selected) {
        setCheckoutItems(JSON.parse(selected));
      } else {
        setCheckoutItems([]);
      }
    } else {
      setCheckoutItems(cart.items);
    }
  }, [cart.items]);

  const totalPrice = checkoutItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/orders', {
        items: checkoutItems,
        totalPrice,
        orderDate: new Date(),
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Remove only purchased items from cart
      const params = new URLSearchParams(window.location.search);
      if (params.get('selected') === '1') {
        // Remove each purchased item from backend and frontend
        for (const item of checkoutItems) {
          await axios.delete('/api/cart/item', {
            headers: { Authorization: `Bearer ${token}` },
            data: { productId: item.product._id, size: item.size }
          }).catch(err => console.error('Failed to remove item from backend:', err));
          dispatch({ type: 'REMOVE_ITEM', payload: { productId: item.product._id, size: item.size } });
        }
        // Clear selected items from localStorage
        localStorage.removeItem('selectedBuyItems');
      } else {
        await clearCartBackend();
        dispatch({ type: 'CLEAR_CART' });
      }
      setNotification({ show: true, message: 'Order placed successfully! Check your email for confirmation.', type: 'success' });
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setNotification({ show: true, message: 'Order failed. Please try again.', type: 'error' });
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <>
      {/* Custom Notification */}
      {notification.show && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-2xl transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="min-h-screen py-16 px-4">
        <div className="max-w-6xl mx-auto w-full">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="bg-white rounded-3xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gray-50 px-8 py-10 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
                </div>
              </div>
              <p className="text-gray-600 ml-15">Review and complete your order</p>
            </div>

            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content - 2 columns */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Your Information */}
                  {user && (
                    <div className="group">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-1 bg-gray-900 rounded-full"></div>
                        <h2 className="text-xl font-bold text-gray-900">Your Information</h2>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 hover:border-gray-400 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{user.fullName}</p>
                            <p className="text-gray-600 text-sm mt-1">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-1 bg-gray-900 rounded-full"></div>
                      <h2 className="text-xl font-bold text-gray-900">Your Items</h2>
                      <span className="bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded-full ml-2">
                        {checkoutItems.length}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {checkoutItems.map((item, idx) => (
                        <div key={idx} className="group relative bg-gray-50 p-5 rounded-2xl border border-gray-200 hover:border-gray-900 transition-all">
                          <div className="flex gap-5">
                            <div className="relative">
                              <img 
                                src={item.product.imageUrl} 
                                alt={item.product.name} 
                                className="w-32 h-32 object-cover rounded-xl"
                              />
                              <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                                {item.quantity}
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h3 className="font-bold text-gray-900 text-xl mb-3">{item.product.name}</h3>
                                <div className="flex gap-3">
                                  <span className="inline-flex items-center bg-white border border-gray-300 px-3 py-1.5 rounded-lg text-sm">
                                    <span className="text-gray-500 mr-1.5">Size:</span>
                                    <span className="font-semibold text-gray-900">{item.size}</span>
                                  </span>
                                  <span className="inline-flex items-center bg-white border border-gray-300 px-3 py-1.5 rounded-lg text-sm">
                                    <span className="text-gray-500 mr-1.5">Qty:</span>
                                    <span className="font-semibold text-gray-900">{item.quantity}</span>
                                  </span>
                                </div>
                              </div>
                              <p className="text-2xl font-bold text-gray-900 mt-3">
                                LKR {(item.product.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar Summary - 1 column */}
                <div className="lg:col-span-1">
                  <div className="sticky top-6">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                        <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-gray-700" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Summary</h2>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-gray-700">
                          <span>Subtotal</span>
                          <span className="font-semibold text-gray-900">LKR {totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>Shipping</span>
                          <span className="font-semibold text-green-600">Free</span>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                          <span className="text-xl font-bold text-gray-900">Total</span>
                          <span className="text-3xl font-bold text-gray-900">LKR {totalPrice.toLocaleString()}</span>
                        </div>
                      </div>

                      <button
                        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handlePlaceOrder}
                        disabled={placingOrder}
                      >
                        {placingOrder ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin inline-block w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full"></span>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Complete Order
                          </span>
                        )}
                      </button>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Order Date</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {orderDate.toLocaleDateString('en-US', { 
                                month: 'long', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
