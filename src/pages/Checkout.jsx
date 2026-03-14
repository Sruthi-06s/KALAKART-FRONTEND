import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import cartService from '../services/cartService';
import orderService from '../services/orderService';
import authService from '../services/authService';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Check if we have state from cart page
    if (location.state) {
      console.log('Received state from cart:', location.state);
      
      // Use the data passed from cart
      setCartItems(location.state.cartItems || []);
      setSubtotal(location.state.subtotal || 0);
      setDiscount(location.state.discount || 0);
      setPromoApplied(location.state.promoApplied || false);
      setPromoCode(location.state.promoCode || '');
      setLoading(false);
    } else {
      console.log('No state received, fetching cart data...');
      fetchCartData();
    }
  }, [location.state]);

  const fetchCartData = async () => {
    try {
      const items = await cartService.getCart();
      console.log('Fetched cart items:', items);
      
      // Format items
      const formattedItems = items.map(item => ({
        ...item,
        displayPrice: item.price || item.product?.price || 0,
        displayName: item.productName || item.product?.name || item.name || 'Product',
        displayQuantity: item.quantity || 1
      }));
      
      setCartItems(formattedItems || []);
      
      const details = await cartService.getCartDetails();
      setSubtotal(details.total || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const applyPromo = () => {
    const code = promoInput.toUpperCase().trim();
    
    if (promoApplied) {
      alert('Promo code already applied!');
      return;
    }

    if (code === 'KALAKART10') {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      setPromoApplied(true);
      setPromoCode(code);
      alert('✅ Promo code applied! 10% discount');
    } 
    else if (code === 'WELCOME20') {
      const discountAmount = subtotal * 0.2;
      setDiscount(discountAmount);
      setPromoApplied(true);
      setPromoCode(code);
      alert('✅ Promo code applied! 20% discount');
    } 
    else {
      alert('❌ Invalid promo code');
    }
    
    setPromoInput('');
  };

  const removePromo = () => {
    setDiscount(0);
    setPromoApplied(false);
    setPromoCode('');
    alert('Promo code removed');
  };

  // ===== FIXED HANDLE SUBMIT FUNCTION =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (placingOrder) return;
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || 
        !formData.city || !formData.state || !formData.pincode) {
      alert('Please fill in all shipping information');
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      alert('Please enter a valid 6-digit pincode');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    setPlacingOrder(true);
    
    try {
      console.log('📦 ===== PLACING ORDER =====');
      
      const user = authService.getCurrentUser();
      if (!user?.id) {
        alert('User not authenticated');
        navigate('/login');
        return;
      }

      // Format shipping address
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;
      
      console.log('Placing order for user:', user.id);
      console.log('Shipping address:', fullAddress);
      console.log('Payment method:', formData.paymentMethod);
      
      // Call the API to place order using orderService
      const orderData = await orderService.placeOrder(fullAddress, formData.paymentMethod);
      
      console.log('✅ Order placed successfully:', orderData);
      
      // Clear cart after successful order
      try {
        await cartService.clearCart();
        console.log('✅ Cart cleared successfully');
      } catch (clearError) {
        console.warn('⚠️ Cart clear warning:', clearError);
      }
      
      // Navigate to success page with order details
      navigate('/order-success', { 
        state: { 
          message: 'Your order has been placed successfully!',
          orderNumber: orderData.orderNumber || orderData.id || ('ORD' + Math.floor(100000 + Math.random() * 900000)),
          total: calculateTotal(),
          customerName: formData.fullName,
          paymentMethod: formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                        formData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'
        } 
      });
      
    } catch (error) {
      console.error('❌ Order placement failed:', error);
      alert('Failed to place order: ' + (error.message || 'Please try again'));
    } finally {
      setPlacingOrder(false);
    }
  };

  const calculateTotal = () => {
    const shipping = subtotal > 500 ? 0 : 50;
    return subtotal + shipping - discount;
  };

  const shipping = subtotal > 500 ? 0 : 50;
  const total = calculateTotal();

  if (loading) {
    return (
      <div className="checkout-loading">
        <div className="loading-spinner"></div>
        <p>Loading checkout...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="shop-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <h2>Payment Method</h2>
            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                />
                <span>UPI</span>
              </label>
            </div>

            <button 
              type="submit" 
              className={`place-order-btn ${placingOrder ? 'loading' : ''}`}
              disabled={placingOrder}
            >
              {placingOrder ? (
                <>
                  <span className="spinner"></span>
                  Processing Order...
                </>
              ) : (
                `Place Order • ₹${total.toLocaleString()}`
              )}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="promo-section">
            <h3>Have a promo code?</h3>
            <div className="promo-input-group">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                disabled={promoApplied}
              />
              <button 
                onClick={applyPromo}
                className="apply-btn"
                disabled={promoApplied || !promoInput}
              >
                Apply
              </button>
            </div>
            <div className="promo-hint">
              Try: KALAKART10 (10% off) or WELCOME20 (20% off)
            </div>
          </div>
          
          {promoApplied && (
            <div className="promo-applied">
              <div className="promo-applied-details">
                <span>Promo: <strong>{promoCode}</strong></span>
                <span className="discount-amount">-₹{discount.toLocaleString()}</span>
              </div>
              <button onClick={removePromo} className="remove-promo-btn">
                ✕ Remove
              </button>
            </div>
          )}
          
          <div className="summary-items">
            {cartItems.map(item => {
              const price = item.price || item.product?.price || item.displayPrice || 0;
              const quantity = item.quantity || item.displayQuantity || 1;
              const name = item.productName || item.product?.name || item.name || item.displayName || 'Product';
              const itemTotal = price * quantity;
              
              return (
                <div key={item.cartId || item.id} className="summary-item">
                  <span>{name} x {quantity}</span>
                  <span>₹{itemTotal.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
          
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount</span>
                <span>-₹{discount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="order-note">
            <p>📦 Free shipping on orders above ₹500</p>
            <p>🔄 7-day easy returns</p>
            <p>🔒 Secure checkout guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;