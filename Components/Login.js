import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import  Toast from 'react-native-toast-message';
import { verifyUser, addUser} from '../DBA/DBAdapter';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email  , setEmail] = useState('');

  const navigation = useNavigation();


  const showToast = (message) => {
    Toast.show({
      text1: message,
      position: 'top',
      type: 'error',
      topOffset: 100,
      borderColor: 'red',
      duration: 1000
    });
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = () => {
    if(username.length > 8 && password.length > 8){
        verifyUser(username, password, (result) => {
            if (result.success) {
                console.log("User verified:", result.user)
                navigation.navigate("BottomTabs")
            } else {
              showToast(result.error);
            }
        })
    } else {
        console.log('Incorrect length')
    }
  };

  const handleRegister = () => {
    if(username.length > 8 && password.length > 8){
        addUser(username, password)
        navigation.navigate("Home")
    } else {
        showToast('Incorrect length')
    }
  };

  return (
    <View style={styles.container}>
      <Toast />
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isLogin ? styles.activeButton : null]}
          onPress={handleToggle}
          disabled={isLogin}
        >
          <Text style={{...styles.toggleButtonText, color: isLogin ? 'white' : 'gray'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isLogin ? styles.activeButton : null]}
          onPress={handleToggle}
          disabled={!isLogin}
        >
          <Text style={{...styles.toggleButtonText, color: isLogin ? 'gray' : 'white'}}>Register</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholderTextColor='white'
        />
        { !isLogin && 
        <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        secureTextEntry={true}
        placeholderTextColor='white'
        />
        }
        <TouchableOpacity
          style={styles.button}
          onPress={isLogin ? handleLogin : handleRegister}
        >
          <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#232F3E'
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
  },
  activeButton: {
    backgroundColor: '#f4511e',
    borderColor: '#f4511e',
  },
  toggleButtonText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: 'white'
  },
  button: {
    backgroundColor: '#f4511e',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;
