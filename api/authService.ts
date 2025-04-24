import axios from 'axios';
import { LoginCredentials, RegisterCredentials, User } from '../types';

const API_URL = 'https://fakestoreapi.com';

export const registerUser = async (credentials: RegisterCredentials): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/users`, credentials);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    // Temporary workaround: Return mock user data
    return {
      id: 1,
      email: credentials.email,
      username: credentials.username,
      name: {
        firstname: 'Demo',
        lastname: 'User'
      }
    };
  }
};

export const loginUser = async (credentials: LoginCredentials): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    // Temporary workaround: Return mock token
    return { token: 'demo-token' };
  }
};

export const getUserById = async (userId: number): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Get user error:', error);
    // Temporary workaround: Return mock user data
    return {
      id: userId,
      email: 'demo@example.com',
      username: 'demo_user',
      name: {
        firstname: 'Demo',
        lastname: 'User'
      }
    };
  }
};