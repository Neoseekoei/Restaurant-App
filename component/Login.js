import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Login() {

  const navigation = useNavigation();

  // State variables to hold email, password, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Basic email validation
    if (!email.trim()) {
      setEmailError('Email is required.');
      return;
    } else {
      setEmailError('');
    }

    // Basic password validation
    if (!password.trim()) {
      setPasswordError('Password is required.');
      return;
    } else {
      setPasswordError('');
    }

    // Clear any previous error messages
    setError(null);

    // Perform login
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("You Have Successfully Logged In!!!")
        navigation.navigate("Menu")
        const user = userCredential.user;
      })
      .catch((error) => {
        setError('Invalid email or password. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>SIGN IN</Text>

      <View style={styles.inputs}>
        <TextInput
          style={[styles.input1, emailError ? { borderColor: 'red', borderWidth: 1 } : null]}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={styles.containerinput}>
          <TextInput
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
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

        <TouchableOpacity style={styles.signin} onPress={handleLogin}>
          <Text>SIGN IN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.texts}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={{ color: 'white', textAlign: 'center', padding: 20, marginTop: 9 }}>FORGOT PASSWORD?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
          <Text style={{ color: 'white', textAlign: 'center', padding: 5 }}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... existing styles ...

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },

  container: {
    justifyContent:'start',
    backgroundColor:'#FFC224',
    paddingBottom:70
  },

  logo: {
    width:250,
    height:330,
  },

  title: {
    fontWeight:800,
    fontSize:25,
     textAlign: 'center',
  },

  input1: {
    backgroundColor:'white',
    height:47,
    width:260,
    marginLeft:30,
    fontWeight:700,
    fontSize:17,
    color:'lightgray',
    borderRadius:15,
    paddingLeft:12,
    shadowOffset: { width: 8, height: 8 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  inputs: {
    marginTop:70,
  },

  signin: {
    borderWidth:1,
    width:120,
    textAlign:'center',
    padding:10,
    marginLeft:100,
    marginTop:20,
    backgroundColor:'white',
    borderColor:'white',
    borderRadius:15, 
    height:47,
    paddingTop:15,
    fontWeight:800,
    fontFamily:'Sans-serif',
    shadowOffset: { width: 8, height: 8 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    paddingLeft:30,
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
    marginTop:20,
    shadowOffset: { width: 8, height: 8 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3,
	},

	input: {
     backgroundColor:'white',
    height:47,
    width:180,
    marginLeft:30,
    fontWeight:700,
		flex: 1,
		paddingVertical: 10,
		paddingRight:10,
		fontSize: 16,
	},

	icon: {
		marginLeft: 5,
	},

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
