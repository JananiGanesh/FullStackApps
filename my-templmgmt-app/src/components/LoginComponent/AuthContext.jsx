import React, { createContext, useState, useEffect, useContext } from 'react';

// Define the shape of our context value (for reference/documentation)
const AuthContextShape = {
  user: null, // or { username: '', roles: [] }
  login: () => {}, // Function to handle login
  logout: () => {}, // Function to handle logout
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Create the context
export const AuthContext = createContext(undefined);

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user from session:", error);
        sessionStorage.removeItem('user'); 
      }
    }
    setIsLoading(false);
  }, []);

  const login = (data) => { 
  if (data.error) {
      setError(data.error);
    } else {
      const newUser = { username: data.username, roles: data.roles };
      setUser(newUser);
      setIsAuthenticated(true);
      sessionStorage.setItem('user', JSON.stringify(newUser));
      setError(null);
    }
};

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('user');
  };

  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
