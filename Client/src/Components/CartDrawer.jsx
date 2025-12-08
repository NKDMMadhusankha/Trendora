import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ open, onClose }) => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ maxWidth: '100vw' }}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black text-2xl">&times;</button>
      </div>
      <div className="p-4 overflow-y-auto flex-1">
        {cart.items.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">Your cart is empty.</div>
        ) : (
          cart.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 mb-6 border-b pb-4">
              <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-bold">{item.product.name}</div>
                <div className="text-sm text-gray-600">Size: {item.size}</div>
                <div className="text-sm text-gray-600">LKR {item.product.price?.toLocaleString('en-LK')}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.product._id, size: item.size, quantity: item.quantity - 1 } })} disabled={item.quantity <= 1} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.product._id, size: item.size, quantity: item.quantity + 1 } })} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { productId: item.product._id, size: item.size } })} className="ml-4 text-red-600">Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.items.length > 0 && (
        <div className="p-4 border-t bg-white">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-blue-700 text-lg">
              LKR {cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toLocaleString('en-LK')}
            </span>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition" onClick={() => { onClose(); navigate('/checkout'); }}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
