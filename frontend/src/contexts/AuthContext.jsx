// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';   
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, role }
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
        } else {
          setUser({ id: decoded.id, role: decoded.role, name: decoded.name || 'User' });
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      const decoded = jwtDecode(data.token);
      setUser({ id: decoded.id, role: data.role, name: data.name || 'User' });
      return data.role; // Taki hum redirection kar sakein
    } catch (error) {
      throw error.response.data.message || 'Login failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAllowed = (roles) => {
    return user && roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAllowed }}>
      {children}
    </AuthContext.Provider>
  );
};