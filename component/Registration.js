import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Registration() {

  const navigation = useNavigation()

  const [text, onChangeText] = React.useState('');

  // State variable to hold the password
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const Create =(() =>{
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
    alert("Done!!!")
    navigation.navigate("Login");
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
      <Text style={styles.title}>SIGN UP</Text>

      <Text style={styles.subtitle}>Pleace fill in the form to create an account</Text>
      <View style={styles.inputs}>

        <TextInput
          style={styles.input1}
          keyboardType="text"
          placeholder="Usename"
        />

        <TextInput
          style={styles.input1}
          keyboardType="email"
          placeholder="Email"
          onChangeText={setEmail}
        />


        <View style={styles.containerinput}>
          <TextInput


            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
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
        <Text style={styles.terms}>By creating an account you agree to our Terms & Privacy</Text>
        <TouchableOpacity style={styles.signin} onPress={Create}><Text>SIGN UP</Text></TouchableOpacity>
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
    shadowOpacity: 0.8,
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
    shadowOpacity: 0.8,
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