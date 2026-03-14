import api from './api';
import authService from './authService';

const cartService = {
  // Get user's cart
  getCart: async () => {
    try {
      const user = authService.getCurrentUser();
      if (!user?.id) {
        console.log('No user logged in');
        return [];
      }
      
      console.log('Fetching cart for user ID:', user.id);
      const response = await api.get(`/cart/${user.id}`);
      console.log('Cart response:', response.data);
      
      return response.data || [];
      
    } catch (error) {
      console.error('Error fetching cart:', error);
      return [];
    }
  },

  // Get cart details (total, count)
  getCartDetails: async () => {
    try {
      const user = authService.getCurrentUser();
      if (!user?.id) {
        return { total: 0, itemCount: 0, items: [] };
      }
      
      const response = await api.get(`/cart/${user.id}/total`);
      return response.data || { total: 0, itemCount: 0, items: [] };
      
    } catch (error) {
      console.error('Error fetching cart details:', error);
      return { total: 0, itemCount: 0, items: [] };
    }
  },

  // Add item to cart - FIXED VERSION
  addToCart: async (productId, quantity) => {
    try {
      console.log('📦 ===== ADD TO CART SERVICE =====');
      console.log('Product ID:', productId, 'Quantity:', quantity);
      
      // Check authentication
      const user = authService.getCurrentUser();
      console.log('Current user:', user);
      
      if (!user?.id) {
        console.error('❌ No user ID found');
        throw new Error('Please login to add items to cart');
      }
      
      // Convert to numbers (backend expects numbers, not strings)
      const numericUserId = parseInt(user.id);
      const numericProductId = parseInt(productId);
      const numericQuantity = parseInt(quantity) || 1;
      
      console.log('Converted values:', {
        userId: numericUserId,
        userIdType: typeof numericUserId,
        productId: numericProductId,
        productIdType: typeof numericProductId,
        quantity: numericQuantity,
        quantityType: typeof numericQuantity
      });
      
      // Validate
      if (isNaN(numericUserId) || !numericUserId) {
        throw new Error('Invalid user ID');
      }
      
      if (isNaN(numericProductId) || !numericProductId) {
        throw new Error('Invalid product ID');
      }
      
      // Make API call
      const url = `/cart/add/${numericUserId}/${numericProductId}?quantity=${numericQuantity}`;
      console.log('📤 Making API call to:', url);
      
      const response = await api.post(url);
      
      console.log('📥 Response:', response);
      console.log('📥 Response data:', response.data);
      
      return response.data;
      
    } catch (error) {
      console.error('❌ ===== ADD TO CART ERROR =====');
      console.error('Error object:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
        console.error('Error headers:', error.response.headers);
        
        // Get the actual error message from server
        let errorMessage = 'Server error';
        if (error.response.data) {
          if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          } else if (error.response.data.error) {
            errorMessage = error.response.data.error;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        }
        
        switch (error.response.status) {
          case 400:
            throw new Error(`Bad request: ${errorMessage}`);
          case 401:
            throw new Error('Your session has expired. Please login again.');
          case 404:
            throw new Error(`Cart service not found: ${errorMessage}`);
          case 500:
            throw new Error(`Server error: ${errorMessage}`);
          default:
            throw new Error(`Error ${error.response.status}: ${errorMessage}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('Cannot connect to server. Please check if backend is running.');
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', error.message);
        throw new Error(error.message);
      }
    }
  },

  // Update quantity
  updateQuantity: async (cartId, quantity) => {
    try {
      const response = await api.put(`/cart/update/${cartId}?quantity=${quantity}`);
      return response.data;
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  },

  // Remove from cart
  removeFromCart: async (cartId) => {
    try {
      const response = await api.delete(`/cart/remove/${cartId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      const user = authService.getCurrentUser();
      if (!user?.id) throw new Error('Not authenticated');
      
      const response = await api.delete(`/cart/clear/${user.id}`);
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};

export default cartService;