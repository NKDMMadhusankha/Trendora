import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [], // { product, quantity, size }
};

function cartReducer(state, action) {
  switch (action.type) {
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
  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
