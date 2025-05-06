import React, { createContext, useContext, useState } from 'react';

// Create a context for cart management
const CartContext = createContext();

/**
 * CartProvider Component - Manages the shopping cart state throughout the application
 * 
 * This provider:
 * 1. Maintains the cart items list
 * 2. Provides functions to add, update, remove items
 * 3. Calculates the total price of all items
 */
export const CartProvider = ({ children }) => {
  // State to hold the cart items array
  const [cart, setCart] = useState([]);

  /**
   * Add an event to the cart
   * If the event is already in the cart, increase its quantity
   * Otherwise, add it as a new item
   */
  const addToCart = (event, quantity) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === event.id);
      if (exists) {
        return prev.map(item => item.id === event.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...event, quantity }];
    });
  };

  /**
   * Update the quantity of an item in the cart
   */
  const updateQuantity = (eventId, quantity) => {
    setCart(prev => prev.map(item => item.id === eventId ? { ...item, quantity } : item));
  };

  /**
   * Remove an item from the cart completely
   */
  const removeFromCart = (eventId) => {
    setCart(prev => prev.filter(item => item.id !== eventId));
  };

  /**
   * Clear all items from the cart
   */
  const clearCart = () => setCart([]);

  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Provide cart state and methods to child components
  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * useCart - Custom hook to access cart context
 * 
 * Makes it easy for any component to access cart state and functions:
 * - cart: Array of cart items
 * - addToCart: Function to add an item to cart
 * - updateQuantity: Function to change item quantity
 * - removeFromCart: Function to remove an item
 * - clearCart: Function to empty the cart
 * - totalPrice: Total cost of all items
 */
export const useCart = () => useContext(CartContext);
