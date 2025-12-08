import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const initialState = {
  items: [], // { product, quantity, size }
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    case 'ADD_ITEM': {
      const { product, size } = action.payload;
      // Check if item with same product and size exists
      const existingIndex = state.items.findIndex(
        item => item.product._id === product._id && item.size === size
      );
      if (existingIndex !== -1) {
        // Update quantity
        const updatedItems = [...state.items];
        updatedItems[existingIndex].quantity += 1;
        return { ...state, items: updatedItems };
      }
      return {
        ...state,
        items: [...state.items, { product, quantity: 1, size }],
      };
    }
    case 'REMOVE_ITEM': {
      const { productId, size } = action.payload;
      return {
        ...state,
        items: state.items.filter(
          item => !(item.product._id === productId && item.size === size)
        ),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, size, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map(item =>
          item.product._id === productId && item.size === size
            ? { ...item, quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fetch cart from backend on login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    console.log('Fetching cart from backend...');
    axios.get('/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      console.log('Cart response:', res.data);
      if (res.data.cart && res.data.cart.items) {
        dispatch({ type: 'LOAD_CART', payload: res.data.cart.items });
      }
    }).catch((err) => { console.error('Cart fetch error:', err); });
  }, []);

  // Sync cart changes to backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    if (state.items.length > 0) {
      console.log('Syncing cart to backend:', state.items);
      axios.post('/api/cart/sync', { items: state.items }, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch((err) => { console.error('Cart sync error:', err); });
    }
  }, [state.items]);

  // Add item to cart (backend)
  async function addItemToCart(productId, quantity) {
    const token = localStorage.getItem('token');
    if (!token) return;
    await axios.post('/api/cart/item', { productId, quantity }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Remove item from cart (backend)
  async function removeItemFromCart(productId, size) {
    const token = localStorage.getItem('token');
    if (!token) return;
    await axios.delete('/api/cart/item', {
      headers: { Authorization: `Bearer ${token}` },
      data: { productId, size }
    });
  }

  // Clear cart (backend)
  async function clearCartBackend() {
    const token = localStorage.getItem('token');
    if (!token) return;
    await axios.delete('/api/cart/clear', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  function enhancedDispatch(action) {
    if (action.type === 'LOAD_CART') {
      dispatch({ type: 'LOAD_CART', payload: action.payload });
      return;
    }
    dispatch(action);
  }

  return (
    <CartContext.Provider value={{
      cart: state,
      dispatch: enhancedDispatch,
      removeItemFromCart,
      clearCartBackend
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
