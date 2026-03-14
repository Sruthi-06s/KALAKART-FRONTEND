import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import cartService from '../services/cartService';
import authService from '../services/authService';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [actionMessage, setActionMessage] = useState({ show: false, text: '', type: '' });
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      console.log('Fetching product with ID:', id);
      const productData = await productService.getProductById(id);
      console.log('Product data received:', productData);
      setProduct(productData);
      
      const relatedData = await productService.getRelatedProducts(id);
      setRelatedProducts(relatedData);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'success') => {
    setActionMessage({ show: true, text, type });
    setTimeout(() => {
      setActionMessage({ show: false, text: '', type: '' });
    }, 3000);
  };

  const handleAddToCart = async () => {
    console.log('🛒 ===== ADD TO CART CLICKED =====');
    console.log('Product:', product);
    console.log('Quantity:', quantity);
    console.log('Product ID type:', typeof product?.id);
    
    // Check authentication
    const isAuth = authService.isAuthenticated();
    console.log('Is authenticated?', isAuth);
    
    if (!isAuth) {
      console.log('User not authenticated - showing login prompt');
      setShowLoginPrompt(true);
      return;
    }

    // Get user from localStorage directly to check
    const userStr = localStorage.getItem('user');
    console.log('Raw user from localStorage:', userStr);
    
    const user = JSON.parse(userStr);
    console.log('Parsed user:', user);
    console.log('User ID:', user?.id);
    console.log('User ID type:', typeof user?.id);

    if (!user?.id) {
      console.error('❌ No user ID found');
      showMessage('❌ Please login again', 'error');
      return;
    }

    // Prevent multiple clicks
    if (isAddingToCart) {
      console.log('Already adding to cart, please wait...');
      return;
    }

    try {
      setIsAddingToCart(true);
      
      console.log('Calling cartService.addToCart with:', {
        productId: product.id,
        productIdType: typeof product.id,
        quantity: quantity,
        quantityType: typeof quantity
      });
      
      const response = await cartService.addToCart(product.id, quantity);
      
      console.log('✅ Add to cart successful:', response);
      showMessage(`✅ ${product.name} added to cart!`);
      
    } catch (error) {
      console.error('❌ Add to cart failed:', error);
      console.error('Error message:', error.message);
      showMessage(`❌ ${error.message || 'Failed to add to cart'}`, 'error');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    console.log('🛒 ===== BUY NOW CLICKED =====');
    
    if (!authService.isAuthenticated()) {
      setShowLoginPrompt(true);
      return;
    }

    if (isAddingToCart) {
      console.log('Already processing, please wait...');
      return;
    }

    try {
      setIsAddingToCart(true);
      
      console.log('Adding item to cart before checkout:', {
        productId: product.id,
        quantity: quantity
      });
      
      const response = await cartService.addToCart(product.id, quantity);
      
      console.log('✅ Item added to cart:', response);
      showMessage(`✅ ${product.name} added! Redirecting to checkout...`);
      
      setTimeout(() => {
        navigate('/checkout');
      }, 1000);
      
    } catch (error) {
      console.error('❌ Buy now failed:', error);
      console.error('Error message:', error.message);
      showMessage(`❌ ${error.message || 'Failed to process order'}`, 'error');
      setIsAddingToCart(false);
    }
  };

  const handleLoginRedirect = () => {
    localStorage.setItem('redirectAfterLogin', `/product/${id}`);
    navigate('/login');
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const formatStateName = (state) => {
    if (!state) return '';
    return state.split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="loading-spinner"></div>
        <p>Discovering this beautiful piece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="back-to-shop">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      {/* Action Message Toast */}
      {actionMessage.show && (
        <div className={`action-toast ${actionMessage.type}`}>
          {actionMessage.text}
        </div>
      )}

      <div className="product-details-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / 
          <Link to="/products">Products</Link> / 
          <Link to={`/products?category=${product.category}`}>{product.category}</Link> / 
          <span>{product.name}</span>
        </div>

        <div className="product-main">
          <div className="product-gallery">
            <div className="main-image">
              <img 
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/600x600/b45f3a/white?text=${product.category}`;
                }}
              />
            </div>
          </div>

          <div className="product-info">
            <div className="product-category">{product.category}</div>
            <h1 className="product-name">{product.name}</h1>
            
            <div className="product-meta">
              <span className="product-state">
                <span className="meta-icon">📍</span>
                {formatStateName(product.state)}
              </span>
            </div>

            <div className="product-price">₹{product.price}</div>

            <div className="product-availability">
              {product.stock > 0 ? (
                <span className="in-stock">✓ In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {product.stock > 0 && (
              <div className="product-actions">
                <div className="quantity-selector">
                  <button 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1 || isAddingToCart}
                    className="quantity-btn"
                  >
                    −
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock || isAddingToCart}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className={`add-to-cart-btn ${isAddingToCart ? 'loading' : ''}`}
                  disabled={isAddingToCart}
                >
                  <span className="cart-icon">🛒</span>
                  {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </button>

                <button 
                  onClick={handleBuyNow}
                  className="buy-now-btn"
                  disabled={isAddingToCart}
                >
                  Buy Now
                </button>
              </div>
            )}

            <div className="product-additional">
              <div className="info-item">
                <span className="info-label">Secure Payment</span>
                <span className="info-value">✓</span>
              </div>
              <div className="info-item">
                <span className="info-label">Free Shipping</span>
                <span className="info-value">On orders above ₹500</span>
              </div>
              <div className="info-item">
                <span className="info-label">Returns</span>
                <span className="info-value">7 days return</span>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>You May Also Like</h2>
            <div className="related-grid">
              {relatedProducts.map(related => (
                <Link to={`/product/${related.id}`} key={related.id} className="related-card">
                  <img 
                    src={related.imageUrl}
                    alt={related.name}
                    className="related-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/200x200/b45f3a/white?text=${related.category}`;
                    }}
                  />
                  <h3>{related.name}</h3>
                  <p className="related-price">₹{related.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="login-prompt-overlay" onClick={() => setShowLoginPrompt(false)}>
          <div className="login-prompt-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowLoginPrompt(false)}>×</button>
            
            <div className="prompt-icon">🔒</div>
            <h2>Login Required</h2>
            <p>Please login or register to add items to cart and make purchases</p>
            
            <div className="prompt-actions">
              <button 
                className="login-btn"
                onClick={handleLoginRedirect}
              >
                Login
              </button>
              <button 
                className="register-btn"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </div>
            
            <button 
              className="guest-link"
              onClick={() => setShowLoginPrompt(false)}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;