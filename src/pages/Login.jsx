import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Get success message from registration if any
  const successMessage = location.state?.message;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('🔐 Login attempt with:', formData.email);
      
      const response = await authService.login(formData);
      console.log('✅ Login successful:', response);
      
      // Check if login was successful (response will have user data with id)
      if (response && response.id) {
        // Check if there's a redirect URL stored
        const redirectTo = localStorage.getItem('redirectAfterLogin');
        if (redirectTo) {
          localStorage.removeItem('redirectAfterLogin');
          navigate(redirectTo);
        } else {
          navigate('/');
        }
        
        // Force a page refresh to update Navbar
        window.location.reload();
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      
      // Handle different error messages
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        {/* Left Side - Branding */}
        <div className="auth-brand">
          <div className="brand-content">
            <h1 className="brand-logo">KalaKart</h1>
            <p className="brand-tagline">From artisans' hands to your home</p>
            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-icon">🪔</span>
                <span>Authentic Handicrafts</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🤝</span>
                <span>Direct from Artisans</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚚</span>
                <span>Free Shipping over ₹500</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✨</span>
                <span>100% Genuine Products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="auth-form-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Please enter your details to sign in</p>
            </div>
            
            {/* Success message from registration */}
            {successMessage && (
              <div className="auth-success">
                <span className="success-icon">✅</span>
                {successMessage}
              </div>
            )}
            
            {/* Error message */}
            {error && (
              <div className="auth-error">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="form-input"
                    autoComplete="email"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="form-input"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" /> 
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
              
              <button 
                type="submit" 
                disabled={loading} 
                className={`auth-btn ${loading ? 'loading' : ''}`}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Logging in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="register-link">
                  Create account
                </Link>
              </p>
            </div>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <button className="social-btn google">
                <span className="social-icon">G</span>
                Google
              </button>
              <button className="social-btn github">
                <span className="social-icon">GH</span>
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;