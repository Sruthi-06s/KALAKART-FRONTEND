import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      console.log('Sending registration data:', formData); // Debug log
      
      const response = await authService.register(formData);
      console.log('Registration response:', response); // Debug log
      
      if (response === 'Registration successful') {
        navigate('/login', { 
          state: { message: 'Registration successful! Please login.' } 
        });
      } else {
        setError(response || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
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
            <p className="brand-tagline">Join our community of artisans and craft lovers</p>
            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-icon">🎨</span>
                <span>Showcase your crafts</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🤝</span>
                <span>Connect with buyers</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📦</span>
                <span>Easy order management</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💫</span>
                <span>Grow your business</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="auth-form-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Create Account</h2>
              <p>Join KalaKart today</p>
            </div>
            
            {error && (
              <div className="auth-error">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="form-input"
                  />
                </div>
              </div>
              
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
                    placeholder="Create a password"
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                <small className="input-hint">Minimum 6 characters</small>
              </div>
              
              <div className="form-group">
                <label>I want to join as</label>
                <div className="role-selector">
                  <label className={`role-option ${formData.role === 'USER' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="USER"
                      checked={formData.role === 'USER'}
                      onChange={handleChange}
                    />
                    <span className="role-content">
                      <span className="role-icon">🛍️</span>
                      <span className="role-title">Customer</span>
                      <span className="role-desc">Shop for beautiful handicrafts</span>
                    </span>
                  </label>
                  
                  <label className={`role-option ${formData.role === 'ARTISAN' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="ARTISAN"
                      checked={formData.role === 'ARTISAN'}
                      onChange={handleChange}
                    />
                    <span className="role-content">
                      <span className="role-icon">🎨</span>
                      <span className="role-title">Artisan</span>
                      <span className="role-desc">Sell your handmade creations</span>
                    </span>
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={loading} 
                className={`auth-btn ${loading ? 'loading' : ''}`}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="register-link">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;