import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await api.get('/auth/check'); // ✅ CORRECT
      setAuthenticated(Boolean(res?.data?.authenticated));
    } catch (err) {
      // 401 / 403 means not logged in (expected)
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading,
        setAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
