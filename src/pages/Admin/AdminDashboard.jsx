import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import adminService from '../../services/adminService';
import authService from '../../services/authService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtisans: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingArtisans: 0,
    recentOrders: []
  });

  useEffect(() => {
    // Check if user is admin
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all stats
      const users = await adminService.getAllUsers();
      const artisans = await adminService.getAllArtisans();
      const products = await adminService.getAllProducts();
      const orders = await adminService.getAllOrders();
      const pendingArtisans = await adminService.getPendingArtisans();
      const revenue = await adminService.getTotalRevenue();
      
      console.log('Orders data:', orders); // Debug log
      console.log('Orders count:', orders?.length); // Debug log
      
      // Calculate total revenue from orders
      let totalRevenue = 0;
      if (Array.isArray(orders) && orders.length > 0) {
        totalRevenue = orders.reduce((sum, order) => {
          return sum + (order.totalAmount || order.total || 0);
        }, 0);
      }

      setStats({
        totalUsers: users?.length || 0,
        totalArtisans: artisans?.length || 0,
        totalProducts: products?.length || 0,
        totalOrders: orders?.length || 0,
        totalRevenue: totalRevenue,
        pendingArtisans: pendingArtisans?.length || 0,
        recentOrders: Array.isArray(orders) ? orders.slice(0, 5) : []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {authService.getCurrentUser()?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎨</div>
          <div className="stat-content">
            <h3>Artisans</h3>
            <p className="stat-number">{stats.totalArtisans}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Products</h3>
            <p className="stat-number">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
            <h3>Orders</h3>
            <p className="stat-number">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Revenue</h3>
            <p className="stat-number">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Pending Artisans</h3>
            <p className="stat-number">{stats.pendingArtisans}</p>
            {stats.pendingArtisans > 0 && (
              <Link to="/admin/artisans/pending" className="pending-link">
                Approve Now →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/admin/users" className="action-btn">
            <span className="action-icon">👥</span>
            Manage Users
          </Link>
          <Link to="/admin/products" className="action-btn">
            <span className="action-icon">📦</span>
            Manage Products
          </Link>
          <Link to="/admin/orders" className="action-btn">
            <span className="action-icon">🛒</span>
            View Orders
          </Link>
          <Link to="/admin/artisans/pending" className="action-btn">
            <span className="action-icon">✓</span>
            Approve Artisans
          </Link>
          <Link to="/admin/categories" className="action-btn">
            <span className="action-icon">🏷️</span>
            Categories
          </Link>
          <Link to="/admin/reports" className="action-btn">
            <span className="action-icon">📊</span>
            Reports
          </Link>
        </div>
      </div>

      {/* Recent Orders - Show if there are orders */}
      {stats.recentOrders.length > 0 && (
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.orderNumber || order.id}</td>
                    <td>{order.user?.name || 'N/A'}</td>
                    <td>{new Date(order.orderDate || order.createdAt).toLocaleDateString()}</td>
                    <td>₹{(order.totalAmount || order.total || 0).toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${order.status?.toLowerCase()}`}>
                        {order.status || 'PENDING'}
                      </span>
                    </td>
                    <td>
                      <Link to={`/admin/orders/${order.id}`} className="view-link">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;