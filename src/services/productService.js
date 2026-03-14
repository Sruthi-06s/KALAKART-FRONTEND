import API from './api';

export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await API.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get products with filters (state, category, search)
  getFilteredProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.state && filters.state !== 'all') {
        params.append('state', filters.state);
      }
      if (filters.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }
      
      const queryString = params.toString();
      const url = `/products${queryString ? `?${queryString}` : ''}`;
      
      const response = await API.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      throw error;
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await API.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Get products by state
  getProductsByState: async (state) => {
    try {
      const response = await API.get(`/products?state=${state}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for state ${state}:`, error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await API.get(`/products?category=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  },

  // Get all unique states from products
  getAllStates: async () => {
    try {
      const response = await API.get('/products');
      const products = response.data;
      // Extract unique states
      const states = [...new Set(products.map(p => p.state))];
      return states;
    } catch (error) {
      console.error('Error fetching states:', error);
      throw error;
    }
  },

  // Get all unique categories from products
  getAllCategories: async () => {
    try {
      const response = await API.get('/products');
      const products = response.data;
      // Extract unique categories
      const categories = [...new Set(products.map(p => p.category))];
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get featured products (you can modify logic as needed)
  getFeaturedProducts: async (limit = 6) => {
    try {
      const response = await API.get('/products');
      const products = response.data;
      // Return first 'limit' products as featured
      // You can modify this logic based on your requirements
      return products.slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  // Get products by artisan ID
  getProductsByArtisan: async (artisanId) => {
    try {
      const response = await API.get(`/products?artisan_id=${artisanId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for artisan ${artisanId}:`, error);
      throw error;
    }
  },

  // Search products by name or description
  searchProducts: async (query) => {
    try {
      const response = await API.get(`/products/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Get related products (by same category or state)
  getRelatedProducts: async (productId, limit = 4) => {
    try {
      // First get the current product
      const currentProduct = await productService.getProductById(productId);
      
      // Then get products with same category or state
      const response = await API.get(
        `/products?category=${currentProduct.category}&state=${currentProduct.state}`
      );
      
      // Filter out current product and limit results
      const related = response.data
        .filter(p => p.id !== productId)
        .slice(0, limit);
      
      return related;
    } catch (error) {
      console.error('Error fetching related products:', error);
      throw error;
    }
  },

  // Get product statistics (for admin dashboard)
  getProductStats: async () => {
    try {
      const response = await API.get('/products');
      const products = response.data;
      
      const stats = {
        totalProducts: products.length,
        totalStates: [...new Set(products.map(p => p.state))].length,
        totalCategories: [...new Set(products.map(p => p.category))].length,
        totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
        lowStock: products.filter(p => p.stock < 5).length,
        outOfStock: products.filter(p => p.stock === 0).length
      };
      
      return stats;
    } catch (error) {
      console.error('Error fetching product stats:', error);
      throw error;
    }
  },

  // Admin: Create new product
  createProduct: async (productData) => {
    try {
      const response = await API.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Admin: Update product
  updateProduct: async (id, productData) => {
    try {
      const response = await API.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  // Admin: Delete product
  deleteProduct: async (id) => {
    try {
      const response = await API.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },

  // Get products by price range
  getProductsByPriceRange: async (minPrice, maxPrice) => {
    try {
      const response = await API.get(`/products?minPrice=${minPrice}&maxPrice=${maxPrice}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by price range:', error);
      throw error;
    }
  },

  // Check product availability
  checkAvailability: async (productId, quantity) => {
    try {
      const product = await productService.getProductById(productId);
      return {
        available: product.stock >= quantity,
        currentStock: product.stock,
        requestedQuantity: quantity
      };
    } catch (error) {
      console.error('Error checking availability:', error);
      throw error;
    }
  }
};

// Export individual functions for direct use
export const {
  getAllProducts,
  getFilteredProducts,
  getProductById,
  getProductsByState,
  getProductsByCategory,
  getAllStates,
  getAllCategories,
  getFeaturedProducts,
  getProductsByArtisan,
  searchProducts,
  getRelatedProducts,
  getProductStats,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByPriceRange,
  checkAvailability
} = productService;