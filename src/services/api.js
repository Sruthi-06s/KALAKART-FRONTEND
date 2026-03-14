import axios from 'axios';

const API_BASE_URL = 'https://kalakart-backend-4i2k.onrender.com';

// Basic Auth credentials (from your backend logs)
const username = 'user';
const password = '5f637b95-9714-4d36-a5d1-e717542455f6';
const basicAuth = 'Basic ' + btoa(username + ':' + password);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': basicAuth  // Always send Basic Auth
  },
});

// You can remove the token interceptor since we're using Basic Auth
// Or keep it if you'll switch to JWT later

export default api;