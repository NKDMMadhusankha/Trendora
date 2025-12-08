import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ open, onClose }) => {
  const { cart, dispatch, removeItemFromCart } = useCart();
  const navigate = useNavigate();

  // Track selected items by index
  const [selectedIndexes, setSelectedIndexes] = React.useState([]);

  // Filter out items with null products
  const validItems = cart.items.filter(item => item.product && item.product._id);

  // Clean up invalid items from cart on mount
  React.useEffect(() => {
    const invalidItems = cart.items.filter(item => !item.product || !item.product._id);
    if (invalidItems.length > 0) {
      console.warn('Removing invalid items from cart:', invalidItems);
      // Remove invalid items from state
      invalidItems.forEach(item => {
        if (item.product?._id) {
          dispatch({ type: 'REMOVE_ITEM', payload: { productId: item.product._id, size: item.size } });
        }
      });
    }
  }, [cart.items, dispatch]);

  // Calculate total for selected items or all items (must be after useState)
  const selectedItems = selectedIndexes.length > 0 ? validItems.filter((_, idx) => selectedIndexes.includes(idx)) : [];
  const selectedTotal = selectedItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  // Toggle selection
  const handleSelectItem = (idx) => {
    setSelectedIndexes((prev) =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  // Buy selected items handler
  const handleBuySelectedItems = () => {
    const selectedItems = validItems.filter((_, idx) => selectedIndexes.includes(idx));
    if (selectedItems.length === 0) return;
    localStorage.setItem('selectedBuyItems', JSON.stringify(selectedItems));
    onClose();
    navigate('/checkout?selected=1');
  };

  if (!open) return null;

  // Prevent click inside drawer from closing
  const handleDrawerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={{ pointerEvents: open ? 'auto' : 'none' }}
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300" />
      {/* Drawer */}
      <div
        className={`ml-auto h-full w-96 bg-white shadow-lg transition-transform duration-500 ease-in-out flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ maxWidth: '100vw' }}
        onClick={handleDrawerClick}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black text-2xl cursor-pointer">&times;</button>
        </div>
        <div className="p-4 overflow-y-auto flex-1">
          {validItems.length === 0 ? (
            <div className="text-gray-500 text-center mt-10">Your cart is empty.</div>
          ) : (
            validItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 mb-6 border-b pb-4">
                {/* Checkbox for selection */}
                <input
                  type="checkbox"
                  checked={selectedIndexes.includes(idx)}
                  onChange={() => handleSelectItem(idx)}
                  className="accent-black w-5 h-5 cursor-pointer"
                />
                <img src={item.product?.imageUrl || '/placeholder.png'} alt={item.product?.name || 'Product'} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-bold">{item.product?.name || 'Unknown Product'}</div>
                  <div className="text-sm text-gray-600">Size: {item.size}</div>
                  <div className="text-sm text-gray-600">LKR {item.product?.price?.toLocaleString('en-LK') || '0'}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.product._id, size: item.size, quantity: item.quantity - 1 } })} disabled={item.quantity <= 1} className="px-2 py-1 bg-gray-200 rounded cursor-pointer">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.product._id, size: item.size, quantity: item.quantity + 1 } })} className="px-2 py-1 bg-gray-200 rounded cursor-pointer">+</button>
                    <button
                      onClick={async () => {
                        await removeItemFromCart(item.product._id, item.size);
                        dispatch({ type: 'REMOVE_ITEM', payload: { productId: item.product._id, size: item.size } });
                      }}
                      className="ml-4 text-red-600 cursor-pointer"
                    >Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {validItems.length > 0 && (
          <div className="p-4 border-t bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-black text-lg">
                LKR {selectedTotal === 0 ? '0' : selectedTotal.toLocaleString('en-LK')}
              </span>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition mb-2 cursor-pointer"
              disabled={selectedIndexes.length === 0}
              onClick={handleBuySelectedItems}
            >Buy Selected Items</button>
            <button className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-900 transition cursor-pointer" onClick={() => { onClose(); navigate('/checkout'); }}>Checkout (All)</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
