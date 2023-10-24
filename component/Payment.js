import { Text, View, StyleSheet, Image,TextInput,TouchableOpacity } from 'react-native';
import React from 'react';
import {useNavigation} from "@react-navigation/native";

export default function Payment() {

  const navigation=useNavigation()

  const [text, onChangeText] = React.useState('');

  return (
    <View style={styles.container}>
        <Text style={styles.header}>THANK YOU !!!</Text>
        <Text style={styles.subtitle}>Your Order Has Been Placed</Text>

        <Image source={require('../assets/8060.jpg')} style={styles.logo}/>

      <TouchableOpacity style={styles.logout} onPress={()=> navigation.navigate("Menu")}>Menu</TouchableOpacity>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    justifyContent:'start',
    backgroundColor:'#FFC224',
    paddingBottom:750
  },

   header: {
    fontSize:40,
    fontWeight:800,
    width:250,
    textAlign:'center',
    alignSelf:'center',
    marginTop:50,

   },

   subtitle: {
    color:'white',
    fontSize:20,
    fontWeight:800,
    width:250,
    textAlign:'center',
    alignSelf:'center',
    marginTop:50,
   },

   logout: {
    textAlign:'center',
    height:40,
    width:150,
    borderWidth:1,
    backgroundColor:'white',
    color: '#FFC224',
    alignSelf:'center',
    marginTop:60,
    paddingTop:10,
    borderRadius:10,
    borderColor:'#FFC224'

   },

   logo: {
    width:250,
    height:330,
    alignSelf:'center',
    marginTop:20,
  },
    
  });