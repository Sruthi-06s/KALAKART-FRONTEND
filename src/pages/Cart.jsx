import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cartService from '../services/cartService';
import authService from '../services/authService';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      
      if (!authService.isAuthenticated()) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      const items = await cartService.getCart();
      console.log('Cart items:', items);
      
      // Format items
      const formattedItems = items.map(item => ({
        id: item.cartId || item.id,
        cartId: item.cartId || item.id,
        productId: item.product?.id || item.productId,
        name: item.product?.name || item.productName || 'Product',
        price: item.product?.price || item.price || 0,
        quantity: item.quantity || 1,
        image: item.product?.imageUrl || item.imageUrl || '/placeholder.jpg',
        artisan: item.product?.artisan?.name || item.artisanName || 'Artisan',
        state: item.product?.state || item.state || 'India'
      }));
      
      setCartItems(formattedItems);
      
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await cartService.updateQuantity(cartId, newQuantity);
      
      setCartItems(items =>
        items.map(item =>
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
      
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await cartService.removeFromCart(cartId);
      setCartItems(items => items.filter(item => item.cartId !== cartId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        setLoading(true);
        await cartService.clearCart();
        setCartItems([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
        alert('Failed to clear cart. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="cart-loading">
        <div className="loading-spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (!authService.isAuthenticated()) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-container">
          <div className="empty-cart-icon">🔒</div>
          <h2>Please Login</h2>
          <p>Login to view your cart and start shopping</p>
          <Link to="/login" className="shop-now-btn">Login</Link>
          <Link to="/register" className="register-link">New user? Register here</Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-container">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Discover beautiful handcrafted items from our artisans</p>
          <Link to="/products" className="shop-now-btn">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart <span className="cart-count">({cartItems.length} items)</span></h1>
          <button onClick={clearCart} className="clear-cart-btn">
            🗑️ Clear Cart
          </button>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items-section">
            {cartItems.map(item => (
              <div key={item.cartId} className="cart-item">
                <div className="cart-item-image">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/200x200/b45f3a/white?text=${item.name.charAt(0)}`;
                    }}
                  />
                </div>
                
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <div>
                      <h3>{item.name}</h3>
                      <p className="item-artisan">By: {item.artisan}</p>
                      <p className="item-state">{item.state}</p>
                    </div>
                    <button 
                      className="remove-item"
                      onClick={() => removeFromCart(item.cartId)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="item-total">
                      <span>Total:</span>
                      <span className="total-amount">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Button */}
          <div className="checkout-actions">
            <button onClick={handleCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>
            <Link to="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;