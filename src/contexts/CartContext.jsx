import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (event, quantity) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === event.id);
      if (exists) {
        return prev.map(item => item.id === event.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...event, quantity }];
    });
  };

  const updateQuantity = (eventId, quantity) => {
    setCart(prev => prev.map(item => item.id === eventId ? { ...item, quantity } : item));
  };

  const removeFromCart = (eventId) => {
    setCart(prev => prev.filter(item => item.id !== eventId));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
