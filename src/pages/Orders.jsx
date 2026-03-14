import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import orderService from '../services/orderService';
import authService from '../services/authService';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      const user = authService.getCurrentUser();
      console.log('Current user in Orders page:', user);
      
      if (!user?.id) {
        console.log('No user logged in');
        setOrders([]);
        setLoading(false);
        return;
      }

      const data = await orderService.getUserOrders(user.id);
      console.log('Orders fetched:', data);
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await orderService.cancelOrder(orderId);
        // Refresh orders after cancellation
        fetchOrders();
        alert('Order cancelled successfully');
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel order');
      }
    }
  };

  const filterOrders = () => {
    if (filter === 'all') return orders;
    return orders.filter(order => order.status?.toLowerCase() === filter.toLowerCase());
  };

  const getStatusColor = (status) => {
    switch(status?.toUpperCase()) {
      case 'PLACED': return 'status-placed';
      case 'CONFIRMED': return 'status-confirmed';
      case 'SHIPPED': return 'status-shipped';
      case 'DELIVERED': return 'status-delivered';
      case 'CANCELLED': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loading-spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (!authService.isAuthenticated()) {
    return (
      <div className="orders-empty">
        <div className="empty-container">
          <div className="empty-icon">🔒</div>
          <h2>Please Login</h2>
          <p>Login to view your order history</p>
          <Link to="/login" className="primary-btn">Login</Link>
          <Link to="/register" className="secondary-link">New user? Register here</Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <div className="empty-container">
          <div className="empty-icon">📦</div>
          <h2>No Orders Yet</h2>
          <p>Looks like you haven't placed any orders</p>
          <Link to="/products" className="primary-btn">Start Shopping</Link>
        </div>
      </div>
    );
  }

  const filteredOrders = filterOrders();

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your orders</p>
      </div>

      <div className="orders-filter">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Orders
        </button>
        <button 
          className={`filter-btn ${filter === 'placed' ? 'active' : ''}`}
          onClick={() => setFilter('placed')}
        >
          Placed
        </button>
        <button 
          className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
          onClick={() => setFilter('confirmed')}
        >
          Confirmed
        </button>
        <button 
          className={`filter-btn ${filter === 'shipped' ? 'active' : ''}`}
          onClick={() => setFilter('shipped')}
        >
          Shipped
        </button>
        <button 
          className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`}
          onClick={() => setFilter('delivered')}
        >
          Delivered
        </button>
        <button 
          className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>

      <div className="orders-list">
        {filteredOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <span className="order-number">Order #{order.orderNumber || order.id}</span>
                <span className="order-date">Placed on {formatDate(order.orderDate)}</span>
              </div>
              <div className="order-status">
                <span className={`status-badge ${getStatusColor(order.status)}`}>
                  {order.status || 'PLACED'}
                </span>
              </div>
            </div>

            <div className="order-items">
              {order.items && order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-image">
                    <img 
                      src={item.product?.imageUrl || '/placeholder.jpg'} 
                      alt={item.product?.name || 'Product'}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/100x100/b45f3a/white?text=Product';
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <h4>{item.product?.name || 'Product'}</h4>
                    <p className="item-artisan">By: {item.product?.artisan?.name || 'Artisan'}</p>
                    <div className="item-price-qty">
                      <span className="item-price">₹{item.price?.toLocaleString()}</span>
                      <span className="item-qty">Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <span>Total Amount:</span>
                <span className="total-price">₹{order.totalAmount?.toLocaleString()}</span>
              </div>
              <div className="order-actions">
                <button 
                  className="view-details-btn"
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                >
                  {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                </button>
                {order.status === 'PLACED' && (
                  <button 
                    className="cancel-btn"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

            {selectedOrder === order.id && (
              <div className="order-details-expanded">
                <h4>Order Details</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Payment Method:</span>
                    <span>{order.paymentMethod || 'Cash on Delivery'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Shipping Address:</span>
                    <span>{order.shippingAddress || 'Address not available'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Order Date:</span>
                    <span>{formatDate(order.orderDate)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Items:</span>
                    <span>{order.items?.length || 0} item(s)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;