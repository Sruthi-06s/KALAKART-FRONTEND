import api from './api';

const adminService = {
  // User Management
  getAllUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  getAllArtisans: async () => {
    try {
      const response = await api.get('/admin/artisans');
      return response.data;
    } catch (error) {
      console.error('Error fetching artisans:', error);
      return [];
    }
  },

  getPendingArtisans: async () => {
    try {
      const response = await api.get('/admin/artisans/pending');
      return response.data;
    } catch (error) {
      console.error('Error fetching pending artisans:', error);
      return [];
    }
  },

  approveArtisan: async (userId) => {
    try {
      const response = await api.put(`/admin/approve/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error approving artisan:', error);
      throw error;
    }
  },

  // Product Management
  getAllProducts: async () => {
    try {
      const response = await api.get('/admin/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Order Management - FIX THIS SECTION
  getAllOrders: async () => {
    try {
      console.log('Fetching all orders...');
      const response = await api.get('/admin/orders');
      console.log('Orders response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      return [];
    }
  },

  getRecentOrders: async (limit = 5) => {
    try {
      const response = await api.get(`/admin/orders/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      return [];
    }
  },

  // Analytics
  getTotalRevenue: async () => {
    try {
      const response = await api.get('/admin/analytics/revenue');
      return response.data?.totalRevenue || 0;
    } catch (error) {
      console.error('Error fetching revenue:', error);
      return 0;
    }
  }
};

export default adminService;