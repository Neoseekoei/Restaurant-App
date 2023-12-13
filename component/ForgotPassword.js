import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleResetPassword = () => {
    // Basic email validation
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    // Clear any previous error messages
    setError(null);

    // Check if the email is in a valid format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Send password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Success', 'Password reset email sent. Check your inbox.');
        navigation.navigate("Login");
      })
      .catch((error) => {
        setError('Failed to send password reset email. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>RESET PASSWORD</Text>

      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}
        
          <TouchableOpacity style={{marginTop:20,marginLeft:30}}><Text style={{color:"white"}}>Go back to <Text style={{color:"blue"}}>Login</Text></Text></TouchableOpacity>

        <TouchableOpacity style={styles.signin} onPress={handleResetPassword}>
          <Text>RESET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'start',
    backgroundColor: '#FFC224',
    paddingBottom: 500,
  },

  logo: {
    width: 250,
    height: 330,
  },

  title: {
    fontWeight: 800,
    fontSize: 25,
    textAlign: 'center',
  },

  input: {
    backgroundColor: 'white',
    height: 47,
    width: 260,
    marginLeft: 30,
    fontWeight: 700,
    fontSize: 17,
    color: 'lightgray',
    borderRadius: 15,
    paddingLeft: 12,
    shadowOffset: { width: 8, height: 8 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  inputs: {
    marginTop: 70,
  },

  signin: {
    borderWidth: 1,
    width: 120,
    textAlign: 'center',
    padding: 10,
    marginLeft: 100,
    marginTop: 20,
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 15,
    height: 47,
    paddingTop: 15,
    fontWeight: 600,
    fontFamily: 'Sans-serif',
    shadowOffset: { width: 8, height: 8 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
