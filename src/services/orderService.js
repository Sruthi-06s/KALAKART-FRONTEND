import api from './api';
import authService from './authService';

const orderService = {
  // Get user orders - FIXED
  getUserOrders: async (userId) => {
    try {
      // If userId is not provided, try to get from authService
      const user = userId ? { id: userId } : authService.getCurrentUser();
      
      if (!user?.id) {
        console.log('No user ID available for fetching orders');
        return [];
      }
      
      console.log('Fetching orders for user ID:', user.id);
      const response = await api.get(`/orders/user/${user.id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Return empty array instead of throwing
      return [];
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error.response?.data || error.message;
    }
  },

  // Get order by order number
  getOrderByNumber: async (orderNumber) => {
    try {
      const response = await api.get(`/orders/number/${orderNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error.response?.data || error.message;
    }
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    try {
      const response = await api.put(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error.response?.data || error.message;
    }
  },

  // Place order from cart
  placeOrder: async (shippingAddress, paymentMethod) => {
    try {
      const user = authService.getCurrentUser();
      if (!user?.id) throw new Error('User not authenticated');
      
      const response = await api.post(
        `/orders/place/${user.id}?shippingAddress=${encodeURIComponent(shippingAddress)}&paymentMethod=${paymentMethod}`
      );
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error.response?.data || error.message;
    }
  },

  // Place single item order
  placeSingleItemOrder: async (productId, quantity, shippingAddress, paymentMethod) => {
    try {
      const user = authService.getCurrentUser();
      if (!user?.id) throw new Error('User not authenticated');
      
      const response = await api.post(
        `/orders/place/${user.id}/product/${productId}?quantity=${quantity}&shippingAddress=${encodeURIComponent(shippingAddress)}&paymentMethod=${paymentMethod}`
      );
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error.response?.data || error.message;
    }
  },

  // Get order summary
  getOrderSummary: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}/summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order summary:', error);
      throw error.response?.data || error.message;
    }
  }
};

export default orderService;