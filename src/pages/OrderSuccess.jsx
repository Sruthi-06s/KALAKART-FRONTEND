import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: '',
    total: 0,
    message: '',
    estimatedDelivery: '',
    paymentMethod: ''
  });
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Get order details from location state
    const state = location.state || {};
    
    const randomOrderId = state.orderNumber || 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    
    const deliveryDate = state.estimatedDelivery || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    setOrderDetails({
      orderNumber: randomOrderId,
      total: state.total || 0,
      message: state.message || 'Your order has been confirmed',
      estimatedDelivery: deliveryDate,
      paymentMethod: state.paymentMethod || 'Cash on Delivery'
    });

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.state, navigate]);

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <div className="success-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round"/>
              <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="success-content">
          <h1 className="success-title">Order Confirmed</h1>
          <p className="success-message">{orderDetails.message}</p>
        </div>

        {/* Order Details */}
        <div className="order-details-grid">
          <div className="detail-item">
            <span className="detail-label">Order Number</span>
            <span className="detail-value">{orderDetails.orderNumber}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Total Amount</span>
            <span className="detail-value price">₹{orderDetails.total.toLocaleString()}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Expected Delivery</span>
            <span className="detail-value">{orderDetails.estimatedDelivery}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Payment Method</span>
            <span className="detail-value">{orderDetails.paymentMethod}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="action-container">
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
            <span className="btn-arrow">→</span>
          </Link>
        </div>

        {/* Redirect Timer */}
        <div className="redirect-timer">
          <span className="timer-text">
            Redirecting to home in {countdown} seconds
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;