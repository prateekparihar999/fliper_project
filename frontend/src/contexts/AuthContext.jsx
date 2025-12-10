// client/src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await api.get('/api/auth/check');
      // backend might return { ok: true, user: {...} } or { authenticated: false, message: ...}
      const ok = Boolean(res?.data?.ok || res?.data?.user || res?.data?.authenticated);
      setAuthenticated(ok);
    } catch (err) {
      // 401 = expected when user not logged in. Handle it silently.
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        // Not authenticated — do not spam error logs
        setAuthenticated(false);
      } else {
        // Unexpected error — log for debugging
        // You can remove this console later if noisy
        console.error('Auth check unexpected error:', err?.response?.data || err.message || err);
        setAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // optionally re-check periodically or when tokens change
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, loading, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
