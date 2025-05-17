import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform
  
  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ShoppingBag, LogIn, User } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { GradientButton } from '../components/GradientButton';
import { ErrorMessage } from '../components/ErrorMessage';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, clearError } = useAuth();
  // const [status, setStatus] = useState('low');
  const [currentNumber, setCurrentNumber] = useState(25);
  const [listOfWin, setListOfWin] = useState<string[] | []>([]);


  // useEffect(() => {
  //   router.replace('/(tabs)');
  // },[])

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      return;
    }
    
    await login({ 
      username: username.trim(), 
      password: password.trim() 
    });
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  const GuessNumber = (currentStatus: string) => {
    // setStatus(currentStatus);
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log('Generated Number:', randomNumber);
   
    if (currentStatus === 'high' && randomNumber > currentNumber) {
      setCurrentNumber(randomNumber);
      alert('you win');
      setListOfWin([...listOfWin, "win"]);
      
    }else {
      setCurrentNumber(randomNumber);
      alert('you lose');
      setListOfWin([...listOfWin, "lose"]);

    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text>Genrated Number: {currentNumber}</Text>
        <TouchableOpacity onPress={ () => GuessNumber("high")}>
          <Text style={{ color: 'black', fontSize: 20 }}>High</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => GuessNumber("low")}>
          <Text style={{ color: 'black', fontSize: 20 }}>law</Text>
        </TouchableOpacity>
         <TouchableOpacity onPress={navigateToRegister}>
                <Text>View all Resule</Text>
          </TouchableOpacity>
      {listOfWin && listOfWin.length > 0 && listOfWin.map((item, index) => (
        <Text key={index} style={{ color: 'black', fontSize: 20 }}>
          User in {index + 1} round {item}
        </Text>
      ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  formContainer: {
    flex: 1,
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
  },
  loginButton: {
    marginTop: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: '#4A5568',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7209B7',
    marginLeft: 8,
  },
});