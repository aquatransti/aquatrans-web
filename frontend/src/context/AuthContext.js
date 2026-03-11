import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar token ao iniciar
  useEffect(() => {
    const token = localStorage.getItem('aquatrans-token');
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setPermissions(data.permissions);
      } else {
        localStorage.removeItem('aquatrans-token');
      }
    } catch (err) {
      console.error('Erro ao validar token:', err);
      localStorage.removeItem('aquatrans-token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      localStorage.setItem('aquatrans-token', data.token);
      setUser(data.user);
      setPermissions(data.permissions);
      
      return { success: true, dashboard: data.permissions.dashboard };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('aquatrans-token');
    setUser(null);
    setPermissions(null);
  };

  const getToken = () => {
    return localStorage.getItem('aquatrans-token');
  };

  const isAuthenticated = () => {
    return !!user && !!getToken();
  };

  const hasPermission = (permission) => {
    return permissions && permissions[permission];
  };

  const isGestor = () => {
    return user?.role === 'gestor';
  };

  const isAdmin = () => {
    return user?.role?.startsWith('admin_') || user?.role === 'gestor';
  };

  const isAluno = () => {
    return user?.role === 'aluno';
  };

  const value = {
    user,
    permissions,
    loading,
    error,
    login,
    logout,
    getToken,
    isAuthenticated,
    hasPermission,
    isGestor,
    isAdmin,
    isAluno
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
