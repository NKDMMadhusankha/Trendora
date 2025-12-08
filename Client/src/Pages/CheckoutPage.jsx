import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CheckoutPage() {
  const { cart, dispatch } = useCart();
  const [user, setUser] = useState(null);
  const [orderDate, setOrderDate] = useState(new Date());
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
      alert('Order placed!');
      navigate('/');
    } catch (err) {
      alert('Order failed.');
    }
  };

  return (
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
  );
}
