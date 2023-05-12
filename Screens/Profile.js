import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


export default function Profile() {
  const handleLogout = () => {
    // Implement your logout logic here
  };
  const navigation = useNavigation()
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={() => {
        // Handle 'Your Account' button press
      }}>
        <Text style={styles.buttonText}>Your Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("ChangePassword")
      }}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("ManageOrder")
      }}>
        <Text style={styles.buttonText}>Manage Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#232F3E',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF9900',
  },
  logoutButtonText: {
    color: '#FF9900',
  },
});
