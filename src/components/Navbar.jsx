import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import cartService from '../services/cartService';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    
    if (currentUser) {
      fetchCartCount();
    }
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (authService.isAuthenticated()) {
        fetchCartCount();
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  const fetchCartCount = async () => {
    try {
      const items = await cartService.getCart();
      console.log('Cart items received:', items);
      setCartCount(items?.length || 0);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartCount(0);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCartCount(0);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">KalaKart</span>
          <span className="logo-tagline">From artisans' hands to your home</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Shop</Link>
          <Link to="/states" className="nav-link">States</Link>
          {/* <Link to="/artisans" className="nav-link">Artisans</Link> */}
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {cartCount > 0 && (
              <span className="cart-count-badge">{cartCount}</span>
            )}
          </Link>
          {user && (
            <Link to="/orders" className="nav-link">Orders</Link>
          )}
          {/* ADD THIS - Admin link only visible to admin users */}
          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="nav-link admin-link">
              Admin
            </Link>
          )}
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-name">Hi, {user.name?.split(' ')[0] || 'User'}</span>
              <span className="user-role-badge">{user.role}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </div>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          <span className={`hamburger ${isOpen ? 'active' : ''}`}></span>
        </button>
      </div>

      {isOpen && (
        <div className="mobile-nav">
          <Link to="/" className="mobile-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" className="mobile-link" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link to="/states" className="mobile-link" onClick={() => setIsOpen(false)}>States</Link>
          <Link to="/artisans" className="mobile-link" onClick={() => setIsOpen(false)}>Artisans</Link>
          <Link to="/cart" className="mobile-link" onClick={() => setIsOpen(false)}>
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
          {user && (
            <Link to="/orders" className="mobile-link" onClick={() => setIsOpen(false)}>Orders</Link>
          )}
          {/* ADD THIS - Admin link in mobile menu */}
          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="mobile-link admin-link" onClick={() => setIsOpen(false)}>
              Admin Dashboard
            </Link>
          )}
          
          
          <div className="mobile-auth">
            {user ? (
              <>
                <span className="mobile-user">{user.name} ({user.role})</span>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="mobile-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-link" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/register" className="mobile-link" onClick={() => setIsOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;