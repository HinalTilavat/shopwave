import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Star } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface ProductItemProps {
  product: Product;
  index: number;
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24;

export const ProductItem: React.FC<ProductItemProps> = ({ product, index }) => {
  const { addToCart } = useCart();
  const delay = index * 100;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Animated.View 
      entering={FadeInUp.delay(delay).duration(400)}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {product.title}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color="#F9C23C" fill="#F9C23C" />
          <Text style={styles.rating}>{product.rating.rate} ({product.rating.count})</Text>
        </View>
        
        <View style={styles.bottomRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToCart}
            activeOpacity={0.7}
          >
            <ShoppingBag size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  imageContainer: {
    height: 140,
    backgroundColor: '#f9f9f9',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#2D3748',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: '#718096',
    marginLeft: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4C1D95',
  },
  addButton: {
    backgroundColor: '#7209B7',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});