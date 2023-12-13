import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Registration() {
  const navigation = useNavigation();

  // State variables to hold the username, email, password, and error messages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleRegistration = () => {
    // Clear any previous error messages
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setError(null);

    // Basic username validation
    if (!username.trim()) {
      setUsernameError('Username is required.');
      return;
    }

    // Basic email validation
    if (!email.trim()) {
      setEmailError('Email is required.');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      return;
    }

    // Basic password validation
    if (!password.trim()) {
      setPasswordError('Password is required.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Account created successfully!');
        navigation.navigate('Login');
        const user = userCredential.user;

        // Reference to the "users" collection
        const usersCollection = collection(db, 'users'+email);

        // Add user data to the collection
        addDoc(usersCollection, {
          Name: username,
          Email: email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>SIGN UP</Text>
      <Text style={styles.subtitle}>Please fill in the form to create an account</Text>
      
      <View style={styles.inputs}>
        <TextInput
          style={[styles.input1, usernameError ? { borderColor: 'red', borderWidth: 1 } : null]}
          keyboardType="text"
          placeholder="Username"
          onChangeText={setUsername}
        />
        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

        <TextInput
          style={[styles.input1, emailError ? { borderColor: 'red', borderWidth: 1 } : null]}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={styles.containerinput}>
          <TextInput
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={[styles.input, passwordError ? { borderColor: 'red', borderWidth: 1 } : null]}
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
          />
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Text style={styles.terms}>Already have an Account? <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{color:"blue",fontWeight:700,marginTop:20}}>Login</TouchableOpacity></Text>
        <TouchableOpacity style={styles.signin} onPress={handleRegistration}>
          <Text>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (your existing styles)

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
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

  input1: {
    backgroundColor: 'white',
    height: 47,
    width: 260,
    marginLeft: 30,
    fontWeight: 700,
    fontSize: 17,
    color: 'lightgray',
    borderRadius: 15,
    paddingLeft: 12,
    marginBottom: 12,
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


  containerinput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 15,
    paddingHorizontal: 14,
    width: 260,
    marginLeft: 30,
    marginTop: 1,
    shadowOffset: { width: 8, height: 8 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3,

  },
  input: {
    backgroundColor: 'white',
    height: 47,
    width: 180,
    marginLeft: 30,
    fontWeight: 700,
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
    shadowOffset: { width: 8, height: 8 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  icon: {
    marginLeft: 5,
  },

  subtitle: {
    color: 'white',
    marginBottom: -40,
    marginTop: 12,
  },

  terms: {
    color: 'white',
    fontSize: 12,
    marginTop: 12,
  },
});