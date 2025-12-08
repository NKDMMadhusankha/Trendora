import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">My Account</h2>
      {user && (
        <div className="mb-4">
          <strong>User:</strong> {user.fullName} ({user.email})
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">Order History</h3>
      {orders.length === 0 ? (
        <div className="text-gray-500">No orders found.</div>
      ) : (
        <ul className="list-disc ml-6">
          {orders.map(order => (
            <li key={order._id} className="mb-4">
              <div><strong>Order ID:</strong> {order._id}</div>
              <div><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</div>
              <div><strong>Total:</strong> LKR {order.totalPrice}</div>
              <div><strong>Items:</strong>
                <ul className="ml-4">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.product?.name || 'Product'} - Size: {item.size} - Qty: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
