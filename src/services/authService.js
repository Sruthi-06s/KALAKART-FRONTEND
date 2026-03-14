import api from './api';

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      console.log('📝 Register attempt with:', userData);
      
      const response = await api.post('/auth/register', userData);
      console.log('✅ Register response:', response.data);
      
      return response.data;
      
    } catch (error) {
      console.error('❌ Register error:', error);
      if (error.response?.data) {
        throw new Error(error.response.data);
      }
      throw error;
    }
  },

  // Login user - FIXED VERSION that expects ID from backend
  login: async (credentials) => {
    try {
      console.log('🔐 Login attempt with:', credentials.email);
      
      const response = await api.post('/auth/login', credentials);
      console.log('✅ Login response:', response.data);
      
      const responseData = response.data;
      console.log('Response data structure:', Object.keys(responseData));
      
      // Check if the response contains the user ID
      if (responseData.id) {
        // Backend is sending the ID correctly
        const userData = {
          id: responseData.id,
          name: responseData.name || credentials.email.split('@')[0],
          email: responseData.email || credentials.email,
          role: responseData.role || 'USER'
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('✅ Stored real user with ID:', userData);
        return userData;
      }
      // Handle case where backend sends message but no ID (temporary fallback)
      else if (responseData.message === 'Login successful') {
        console.warn('⚠️ Backend did not send user ID! Please update backend to include id, name, email');
        
        // Create temporary user (but cart won't work until backend is fixed)
        const userData = {
          id: Date.now(), // Temporary ID - CART WON'T WORK!
          email: credentials.email,
          role: responseData.role || 'USER',
          name: credentials.email.split('@')[0]
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('⚠️ Stored temporary user (cart will fail):', userData);
        return userData;
      }
      
      throw new Error('Login failed: Invalid response from server');
      
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      const user = JSON.parse(userStr);
      console.log('👤 Current user from localStorage:', user);
      return user;
    } catch (e) {
      console.error('Error parsing user:', e);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('user') !== null;
  },

  // Check if user is admin
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'ADMIN';
  },

  // Check if user is artisan
  isArtisan: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'ARTISAN';
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log('👋 User logged out');
  },

  // Get user role
  getUserRole: () => {
    const user = authService.getCurrentUser();
    return user?.role || null;
  },

  // Get user ID
  getUserId: () => {
    const user = authService.getCurrentUser();
    return user?.id || null;
  }
};

export default authService;