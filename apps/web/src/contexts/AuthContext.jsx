
import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model);
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid);
  const [loading, setLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(localStorage.getItem('remember_me') === 'true');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isRemembered = localStorage.getItem('remember_me') === 'true';
        const sessionActive = sessionStorage.getItem('pb_session_active') === 'true';
        const expireTime = localStorage.getItem('pb_auth_expire');

        // Check if session was closed without remember me, or if token expired
        if (!isRemembered && !sessionActive) {
          pb.authStore.clear();
        } else if (isRemembered && expireTime && new Date().getTime() > parseInt(expireTime)) {
          pb.authStore.clear();
          localStorage.removeItem('pb_auth_expire');
        }

        if (pb.authStore.isValid) {
          // authRefresh fetches the latest user record, ensuring fields like 'role' are up-to-date
          const authData = await pb.collection('users').authRefresh({ $autoCancel: false });
          setCurrentUser(authData.record);
          setIsAuthenticated(true);
          
          // Refresh session flag if not remembered
          if (!isRemembered) {
            sessionStorage.setItem('pb_session_active', 'true');
          }
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth refresh failed:', error);
        pb.authStore.clear();
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const unsubscribe = pb.authStore.onChange((token, model) => {
      setCurrentUser(model);
      setIsAuthenticated(!!model);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signup = async (data) => {
    const record = await pb.collection('users').create(data, { $autoCancel: false });
    return record;
  };

  const login = async (email, password, remember = false) => {
    const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
    
    // Explicitly set currentUser here to ensure role is immediately available
    setCurrentUser(authData.record);
    setIsAuthenticated(true);
    
    if (remember) {
      const expire = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem('pb_auth_expire', expire.toString());
      localStorage.setItem('remember_me', 'true');
    } else {
      localStorage.removeItem('pb_auth_expire');
      localStorage.setItem('remember_me', 'false');
      sessionStorage.setItem('pb_session_active', 'true');
    }
    
    return authData;
  };

  const logout = () => {
    pb.authStore.clear();
    localStorage.removeItem('pb_auth_expire');
    localStorage.removeItem('remember_me');
    sessionStorage.removeItem('pb_session_active');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const requestOTP = async (email) => {
    const result = await pb.collection('users').requestOTP(email, { $autoCancel: false });
    return result;
  };

  const completeOTPVerification = async (otpId, code) => {
    const authData = await pb.collection('users').authWithOTP(otpId, code, { $autoCancel: false });
    
    if (rememberMe) {
      const expire = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem('pb_auth_expire', expire.toString());
      localStorage.setItem('remember_me', 'true');
    } else {
      localStorage.setItem('remember_me', 'false');
      sessionStorage.setItem('pb_session_active', 'true');
    }

    setCurrentUser(authData.record);
    setIsAuthenticated(true);
    return authData;
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    rememberMe,
    setRememberMe,
    signup,
    login,
    logout,
    requestOTP,
    completeOTPVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
