import axios from 'axios';
import { Product } from '../types';

const API_URL = 'https://fakestoreapi.com';

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Get categories error:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Get products by category error (${category}):`, error);
    throw error;
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Get all products error:', error);
    throw error;
  }
};

export const getProductById = async (productId: number): Promise<Product> => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Get product by id error (${productId}):`, error);
    throw error;
  }
};