// Reusable API service for communicating with the Express backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    ...options,
    credentials: 'include', // Ensure session cookies are sent
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Health
  checkHealth: () => request('/api/health'),

  // Products
  getProducts: (category) => {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return request(`/api/products${query}`);
  },
  getProductById: (id) => request(`/api/products/${id}`),

  // Authentication
  signup: (userData) => request('/api/auth/signup', { method: 'POST', body: userData }),
  login: (credentials) => request('/api/auth/login', { method: 'POST', body: credentials }),
  getMe: () => request('/api/auth/me'),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
};

export default api;
