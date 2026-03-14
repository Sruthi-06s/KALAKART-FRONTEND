import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image || '/default-product.jpg'} alt={item.name} />
      </div>
      
      <div className="cart-item-details">
        <div className="cart-item-header">
          <h3 className="cart-item-name">{item.name}</h3>
          <button 
            className="remove-item-btn"
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
          >
            ×
          </button>
        </div>
        
        <div className="cart-item-info">
          <span className="artisan-name">By: {item.artisan || 'Traditional Artisan'}</span>
          <span className="item-state">{item.state || 'India'}</span>
        </div>
        
        <div className="cart-item-price">₹{item.price}</div>
        
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button 
              className="quantity-btn"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span className="quantity">{item.quantity}</span>
            <button 
              className="quantity-btn"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          
          <div className="item-total">
            Total: ₹{item.price * item.quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;