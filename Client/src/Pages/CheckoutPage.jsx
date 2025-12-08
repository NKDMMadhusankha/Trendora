import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CheckoutPage() {
  const { cart, dispatch } = useCart();
  const [user, setUser] = useState(null);
  const [orderDate, setOrderDate] = useState(new Date());
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const totalPrice = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/orders', {
        items: cart.items,
        totalPrice,
        orderDate: new Date(),
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: 'CLEAR_CART' });
      setNotification({ show: true, message: 'Order placed successfully! Check your email for confirmation.', type: 'success' });
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setNotification({ show: true, message: 'Order failed. Please try again.', type: 'error' });
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {user && (
        <div className="mb-4">
          <strong>User:</strong> {user.fullName} ({user.email})
        </div>
      )}
      <div className="mb-4">
        <strong>Order Date:</strong> {orderDate.toLocaleString()}
      </div>
      <div className="mb-4">
        <strong>Items Purchased:</strong>
        <ul className="list-disc ml-6">
          {cart.items.map((item, idx) => (
            <li key={idx}>
              {item.product.name} - Size: {item.size} - Qty: {item.quantity} - Price: ${item.product.price * item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <strong>Total Price:</strong> ${totalPrice}
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
    </>
  );
}
