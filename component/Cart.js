import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firebase';
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';

export default function Cart({route}) {

  const navigation=useNavigation()

    const { foodItem, count } = route.params
    return(
        <View style={styles.mainContainer}>
              <View style={styles.row1}>

                <Text style={styles.cardTexts1}>{foodItem.name}</Text>
                <Image
                  style={styles.card1}
                  source={foodItem.image}

                />
                <Text style={styles.cardTexts2}>{count}</Text>
                <Text style={styles.cardTexts3}>{foodItem.price}</Text>

                <TouchableOpacity style={styles.order} onPress={()=> navigation.navigate("Payment")}>place order</TouchableOpacity>
              </View>
        </View>
    )
}

const styles = StyleSheet.create({

     mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignContent:'center',
      backgroundColor:'#FFC224'
     },
    
    
    card1: {
      width:250,
      height: 190,
      borderRadius: 10,
      alignContent:'center',
      marginLeft:70
     
    },
  
    cardTexts: {
      fontWeight: 700,
    },
  
    cardTexts1: {
      fontWeight:700,
      width:240,
      alignSelf:'center',
      fontSize:23,
      padding:15,
    },

    cardTexts2: {
      fontWeight:700,
      width:90,
      alignSelf:'center',
      fontSize:22,
      padding:5,
    },

    cardTexts3: {
      fontWeight:700,
      width:90,
      alignSelf:'center',
      fontSize:20,
      padding:15,
    },

    order: {
     width:170,
     height:40,
     borderWidth:1,
     backgroundColor:'white',
     borderRadius:10,
     borderColor:'#FFC224',
     textAlign:'center',
     alignSelf:'center',
     marginTop:20,
     fontWeight:700,
     fontSize:19,
     paddingTop:8
    },

})