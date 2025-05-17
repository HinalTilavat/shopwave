import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem, CartState } from '../types';

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  TotalWin: number;
  TotalLose: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  TotalWin: 0,
  TotalLose: 0,
};

const calculateCartTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  return { totalItems, totalPrice };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.id
      );
      
      let updatedItems;
      
      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item
        updatedItems = [...state.items, { product: action.payload, quantity: 1 }];
      }
      
      return {
        items: updatedItems,
        ...calculateCartTotals(updatedItems),
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(
        item => item.product.id !== action.payload
      );
      
      return {
        items: updatedItems,
        ...calculateCartTotals(updatedItems),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // If quantity is zero or negative, remove the item
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: productId });
      }
      
      const updatedItems = state.items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      );
      
      return {
        items: updatedItems,
        ...calculateCartTotals(updatedItems),
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  
  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};