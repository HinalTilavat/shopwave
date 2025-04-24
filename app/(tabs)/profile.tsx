import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { User, LogOut, Mail, Phone, Chrome as Home, Settings, Heart, CreditCard, CircleHelp as HelpCircle, Bell } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { GradientButton } from '../../components/GradientButton';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  
  const MenuOption = ({ icon, title, onPress }: { 
    icon: React.ReactNode, 
    title: string,
    onPress?: () => void 
  }) => (
    <TouchableOpacity 
      style={styles.menuOption}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuIconContainer}>
        {icon}
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrowIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#7209B7', '#3A0CA3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user?.username?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.headerTitle}>
          {user?.username || 'User'}
        </Text>
        <Text style={styles.headerSubtitle}>
          {user?.email || 'email@example.com'}
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.menuContainer}>
            <MenuOption 
              icon={<User size={20} color="#7209B7" />} 
              title="Personal Information" 
            />
            <MenuOption 
              icon={<Bell size={20} color="#7209B7" />} 
              title="Notifications" 
            />
            <MenuOption 
              icon={<Settings size={20} color="#7209B7" />} 
              title="Settings" 
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shopping</Text>
          
          <View style={styles.menuContainer}>
            <MenuOption 
              icon={<Heart size={20} color="#F72585" />} 
              title="Wishlist" 
            />
            <MenuOption 
              icon={<CreditCard size={20} color="#F72585" />} 
              title="Payment Methods" 
            />
            <MenuOption 
              icon={<Home size={20} color="#F72585" />} 
              title="Shipping Addresses" 
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.menuContainer}>
            <MenuOption 
              icon={<HelpCircle size={20} color="#4361EE" />} 
              title="Help Center" 
            />
          </View>
        </View>
        
        <View style={styles.logoutContainer}>
          <GradientButton
            title="Logout"
            onPress={logout}
            iconLeft={<LogOut size={18} color="#FFFFFF" />}
            gradientColors={['#F72585', '#7209B7']}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
  },
  arrowContainer: {
    paddingHorizontal: 8,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#A0AEC0',
  },
  logoutContainer: {
    marginVertical: 24,
  },
});