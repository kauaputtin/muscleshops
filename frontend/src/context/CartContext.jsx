import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, variation = null) => {
    const existing = cart.find(item => item.product._id === product._id && item.variation === variation);
    if (existing) {
      setCart(cart.map(item => 
        item.product._id === product._id && item.variation === variation 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      ));
    } else {
      setCart([...cart, { product, quantity, variation }]);
    }
  };

  const removeFromCart = (id, variation) => {
    setCart(cart.filter(item => !(item.product._id === id && item.variation === variation)));
  };

  const updateQuantity = (id, variation, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, variation);
    } else {
      setCart(cart.map(item => 
        item.product._id === id && item.variation === variation 
          ? { ...item, quantity } 
          : item
      ));
    }
  };

  const clearCart = () => setCart([]);

  const getTotal = () => cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};