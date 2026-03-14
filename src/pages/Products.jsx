import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Get filters from URL on load and when URL changes
  useEffect(() => {
    const stateFromUrl = searchParams.get('state');
    if (stateFromUrl) {
      setSelectedState(stateFromUrl);
    }
    
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
    
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [location.search]);

  const formatStateName = (state) => {
    if (!state) return '';
    return state.split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueStates = [...new Set(products.map(p => p.state))];
      const uniqueCategories = [...new Set(products.map(p => p.category))];
      setStates(uniqueStates);
      setCategories(uniqueCategories);
      
      applyFilters();
    }
  }, [products, selectedState, selectedCategory, sortBy, searchTerm]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];
    
    console.log('Filtering with state:', selectedState); // Debug log

    // Apply state filter
    if (selectedState && selectedState !== 'all') {
      filtered = filtered.filter(p => p.state === selectedState);
      console.log(`Filtered by state ${selectedState}:`, filtered.length); // Debug log
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    switch(sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSelectedState('all');
    setSelectedCategory('all');
    setSortBy('name');
    setSearchTerm('');
    // Remove query params from URL
    window.history.replaceState({}, '', '/products');
  };

  const getFallbackImage = (category) => {
    return `https://placehold.co/300x400/b45f3a/white?text=${category}`;
  };

  if (loading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner"></div>
        <p>Discovering beautiful handicrafts...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="page-title">
          {selectedState !== 'all' ? formatStateName(selectedState) : 'All'} Products
          {selectedState !== 'all' && (
            <span className="filter-badge">{formatStateName(selectedState)}</span>
          )}
        </h1>
        <p className="page-subtitle">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="filters-bar">
        <div className="filters-left">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon"></span>
          </div>

          <div className="filter-select-wrapper">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="filter-select"
            >
              <option value="all">All States</option>
              {states.map(state => (
                <option key={state} value={state}>
                  {formatStateName(state)}
                </option>
              ))}
            </select>
            <span className="select-icon"></span>
          </div>

          <div className="filter-select-wrapper">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <span className="select-icon"></span>
          </div>

          <div className="filter-select-wrapper">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Sort by: Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <span className="select-icon"></span>
          </div>

          {(selectedState !== 'all' || selectedCategory !== 'all' || searchTerm || sortBy !== 'name') && (
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear Filters ✕
            </button>
          )}
        </div>

        <div className="filters-right">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >⊞</button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >≡</button>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className={`products-container ${viewMode === 'grid' ? 'products-grid' : 'products-list'}`}>
          {filteredProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img 
                  src={product.imageUrl || getFallbackImage(product.category)}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getFallbackImage(product.category);
                  }}
                />
                {product.stock < 5 && (
                  <span className="stock-badge">Only {product.stock} left</span>
                )}
              </div>
              
              <div className="product-details">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">
                  {product.description?.substring(0, 60)}...
                </p>
                <div className="product-footer">
                  <span className="product-price">₹{product.price}</span>
                  <span className="product-state">{formatStateName(product.state)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No products found</h3>
          <p>Try adjusting your filters</p>
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;