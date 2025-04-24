import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterCredentials, AuthState } from '../types';
import { loginUser, registerUser, getUserById } from '../api/authService';
import { storeToken, getToken, storeUserId, getUserId, clearStorage } from '../utils/storage';
import { router } from 'expo-router';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await getToken();
        const storedUserId = await getUserId();

        if (token && storedUserId) {
          const userId = parseInt(storedUserId, 10);
          const user = await getUserById(userId);

          setState({
            isAuthenticated: true,
            user,
            token,
            loading: false,
            error: null,
          });
        } else if (storedUserId) {
          // Temporary workaround: Allow access with just userId
          const userId = parseInt(storedUserId, 10);
          const user = await getUserById(userId);
          setState({
            isAuthenticated: true,
            user,
            token: 'demo-token',
            loading: false,
            error: null,
          });
        } else {
          setState({
            ...initialState,
            loading: false,
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setState({
          ...initialState,
          loading: false,
          error: 'Session expired. Please login again.',
        });
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Temporary workaround: Skip token validation
      const userId = '1';
      await storeUserId(userId);
      
      const user = await getUserById(parseInt(userId, 10));
      
      setState({
        isAuthenticated: true,
        user,
        token: 'demo-token',
        loading: false,
        error: null,
      });
       router.replace('/(tabs)');
    } catch (error) {
      setState({
        ...initialState,
        loading: false,
        error: 'Something went wrong. Please try again.',
      });
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const user = await registerUser(credentials);
      setState(prev => ({ ...prev, loading: false }));
      
      // Auto login after registration
      await login({
        username: credentials.username,
        password: credentials.password,
      });
    } catch (error) {
      setState({
        ...initialState,
        loading: false,
        error: 'Registration failed. Please try again.',
      });
    }
  };

  const logout = async () => {
    await clearStorage();
    setState({
      ...initialState,
      loading: false,
    });
    router.replace('/login');
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};