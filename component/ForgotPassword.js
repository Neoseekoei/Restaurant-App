import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useState } from 'react';


export default function ForgotPassword() {

  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  // const [text, onChangeText] = useState('');

  const Create = (() => {
    sendPasswordResetEmail(auth, email)
      .then((userCredential) => {
        // Signed up
        alert("Done!!!")
        navigation.navigate("Login")
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  })
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>RESET PASSWORD</Text>

      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeText}
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
        />


        <TouchableOpacity style={styles.signin} onPress={Create}><Text>RESET</Text></TouchableOpacity>
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
    shadowOpacity: 0.8,
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
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },



});