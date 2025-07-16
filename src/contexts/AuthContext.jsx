import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const useBackendAuth = import.meta.env.VITE_USE_AUTH_API === 'true';
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (useBackendAuth) {
      // Backend JWT authentication
      const hasToken = !!getToken();
      setUser(hasToken ? { authenticated: true } : null);
      setLoading(false);
    } else {
      // Firebase authentication
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser?.uid === "i67JburFKwRSWgKaXpraD9DWioD3") {
          setUser(firebaseUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [useBackendAuth]);

  // JWT token management
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  const setToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  // Backend JWT login
  const backendLogin = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.authToken);
        return { success: true, user: data };
      } else {
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Firebase login
  const firebaseLogin = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      
      if (res.user.uid === "i67JburFKwRSWgKaXpraD9DWioD3") {
        return { success: true, user: res.user };
      } else {
        await signOut(auth);
        return { success: false, error: "Nice try. You're not me." };
      }
    } catch (err) {
      return { success: false, error: "Nice try. You're not me." };
    }
  };

  const login = async (email, password) => {
    const result = useBackendAuth 
      ? await backendLogin(email, password)
      : await firebaseLogin(email, password);
      
    if (result.success) {
      setUser(useBackendAuth ? { authenticated: true } : result.user);
    }
    return result;
  };

  const logout = async () => {
    try {
      if (useBackendAuth) {
        removeToken();
      } else {
        await signOut(auth);
      }
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    }
  };

  const isAuthenticated = () => {
    return !!user;
  };

  // Get authentication headers for API calls
  const getAuthHeaders = () => {
    if (useBackendAuth) {
      const token = getToken();
      return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
    return {}; // Firebase doesn't need API headers
  };

  // Enhanced fetch function that automatically adds auth headers
  const authenticatedFetch = async (url, options = {}) => {
    const authHeaders = getAuthHeaders();
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 401 Unauthorized responses
      if (response.status === 401) {
        if (useBackendAuth) {
          removeToken();
          setUser(null);
          window.location.href = '/login';
        }
        throw new Error('Authentication failed');
      }
      
      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    getToken,
    getAuthHeaders,
    authenticatedFetch,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}