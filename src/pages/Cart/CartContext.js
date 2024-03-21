import React, { createContext, useContext, useReducer } from 'react';

const cartActions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case cartActions.ADD_TO_CART:
      const existingProduct = state.find(
        (item) => item.id === action.payload.id,
      );

      if (existingProduct) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case cartActions.REMOVE_FROM_CART:
      const existingProductToRemove = state.find(
        (item) => item.id === action.payload.id,
      );

      if (existingProductToRemove) {
        if (existingProductToRemove.quantity > 1) {
          return state.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
        } else {
          return state.filter((item) => item.id !== action.payload.id);
        }
      }

    default:
      return state;
  }
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: cartActions.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: cartActions.REMOVE_FROM_CART, payload: product });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export { CartProvider, useCart };