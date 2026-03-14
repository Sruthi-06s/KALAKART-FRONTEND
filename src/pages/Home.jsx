import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);

      const productsData = await productService.getAllProducts();
      setProducts(productsData);

      const uniqueStates = [...new Set(productsData.map(p => p.state))];
      const uniqueCategories = [...new Set(productsData.map(p => p.category))];

      setStates(uniqueStates);
      setCategories(uniqueCategories);

    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${searchQuery}`;
    }
  };

  const formatStateName = (state) => {
    return state.split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };
  {states.map((state) => {
  const stateProducts = products.filter(p => p.state === state);

  return (
    <Link
      to={`/products?state=${encodeURIComponent(state)}`}  // This is correct ✅
      key={state}
      className="state-card"
    >
      <div className="state-card-overlay">
        <h3 className="state-name">{formatStateName(state)}</h3>
        <p className="state-count">{stateProducts.length} products</p>
      </div>
    </Link>
  );
})}

  const getFallbackImage = (category) => {
    return `https://placehold.co/300x400/b45f3a/white?text=${category}`;
  };

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner"></div>
        <p>Loading beautiful handcrafts...</p>
      </div>
    );
  }

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover India's Finest<br />
            <span className="hero-highlight">Handicrafts</span>
          </h1>

          <p className="hero-subtitle">
            Direct from skilled artisans across {states.length} states
          </p>

          <Link to="/products" className="hero-btn">
            Explore Products
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{products.length}+</span>
            <span className="stat-label">Products</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">{states.length}</span>
            <span className="stat-label">States</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">{categories.length}</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            placeholder="Search handcrafts, artisans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>

      {/* Shop by State */}
      {states.length > 0 && (
        <section className="states-section">
          <h2 className="section-title">Shop by State</h2>

          <div className="states-grid">
            {states.map((state) => {
              const stateProducts = products.filter(p => p.state === state);

              return (
                <Link
                  to={`/products?state=${encodeURIComponent(state)}`}
                  key={state}
                  className="state-card"
                >
                  <div className="state-card-overlay">
                    <h3 className="state-name">{formatStateName(state)}</h3>
                    <p className="state-count">{stateProducts.length} products</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="featured-section">
          <h2 className="section-title">Featured Products</h2>

          <div className="products-grid">
            {products.slice(0, 6).map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="product-card"
              >

                <div className="product-image-container">
                  <img
                    src={product.imageUrl || getFallbackImage(product.category)}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getFallbackImage(product.category);
                    }}
                  />
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">₹{product.price}</p>
                  <p className="product-state">
                    {formatStateName(product.state)}
                  </p>
                </div>

              </Link>
            ))}
          </div>

          <div className="view-all-container">
            <Link to="/products" className="view-all-btn">
              View All Products
            </Link>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="categories-section">
          <h2 className="section-title">Browse by Category</h2>

          <div className="categories-grid">
            {categories.map((category) => {
              const categoryProducts = products.filter(p => p.category === category);

              return (
                <Link
                  to={`/products?category=${encodeURIComponent(category)}`}
                  key={category}
                  className="category-card"
                >
                  <h3 className="category-name">{category}</h3>
                  <p className="category-count">
                    {categoryProducts.length} items
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
};

export default Home;