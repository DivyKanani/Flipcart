import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GlobalContext } from '../App';
import { updatePassword, getPassword } from '../DBA/DBAdapter';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation();

  const handlePasswordChange = () => {
    // Perform validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return;
    }

    if (newPassword !== confirmPassword) {
      // Passwords do not match
      return;
    }

    getPassword(user.name, (result) => {
      if (result.success && result.password === currentPassword) {
        //updatePassword(user.name, newPassword);
      } else {
        console.log('Incorrect Password');
      }
    });

    navigation.goBack();
  };

  return (
    <LinearGradient colors={['rgba(135, 206, 250, 0.6)', 'rgba(244, 81, 30, 0.6)']} style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={34} color="white" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello {user.name}!</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 15,
  },
  header: {
    position: 'absolute',
    top: 100,
    left: 10,
    marginTop: 24,
    marginLeft: 16,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#232F3E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePassword;
