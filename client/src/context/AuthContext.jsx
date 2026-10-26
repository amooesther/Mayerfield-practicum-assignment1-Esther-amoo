import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication session on initial app load
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const data = await api.getMe();
        if (isMounted) {
          setUser(data.user || null);
        }
      } catch (err) {
        // Not authenticated or server not running — clean fallback
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials) => {
    setError(null);
    try {
      const data = await api.login(credentials);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const signup = async (userData) => {
    setError(null);
    try {
      const data = await api.signup(userData);
      return data;
    } catch (err) {
      setError(err.message || 'Signup failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (err) {
      console.warn('Logout error (clearing local state):', err.message);
    } finally {
      setUser(null);
      setError(null);
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
