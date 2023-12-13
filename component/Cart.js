import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';

export default function Cart({route}) {

  const navigation=useNavigation()
  const { foodItem, count } = route.params;


  const total = foodItem.total || 0;
  const user = auth.currentUser;

  const fetchCart = async () => {
    try {
      if (!user) {
        console.error("User not authenticated");
        return;
      }
  
      // Get the user's email
      const email = user.email;
  
      // Creating a reference to the "Cart" collection
      const cartCollection = collection(db, "Cart"+email);
  
      // Adding a new document to the "Cart" collection with the user's ID and other data
      const docRef = await addDoc(cartCollection, {
        UserId: user.uid,  // Include the user's ID in the document
        Name: foodItem.name,
        Price: total,
        Image: foodItem.image,
        Quantity: count,
        Description: foodItem.description,
        Options: foodItem.options  // Assuming you want to store the quantity in the document
      });
      navigation.navigate("Payment");
      alert("Order Confirmed");
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document to Cart collection: ", error);
    }
  };





    return(
        <View style={styles.mainContainer}>
              <View style={styles.row1}>

                <Text style={styles.confirm}>Confirm Order</Text>
               <View style={styles.group}>
                <Text style={styles.cardTexts1}>{foodItem.name}</Text>
                <Image
                  style={styles.card1}
                  source={foodItem.image}

                />
                <View style={styles.numb}>
                <Text style={styles.quantity}>Quantity:</Text>
                <Text style={styles.cardTexts2}>{count}</Text>
                </View>
                <Text style={styles.cardTexts3}>Price:R{total}</Text>
                 </View>
                <TouchableOpacity style={styles.order} onPress={fetchCart}>place order</TouchableOpacity>
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
      alignSelf:'center',
      
     
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
      marginTop:10,
      fontSize:22,
      padding:5,
    },

    cardTexts3: {
      fontWeight:700,
      width:90,
      
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
     paddingTop:8,
     shadowOffset: { width: 8, height: 8 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    },

   group: {
    backgroundColor:'white',
    width:300,
    alignSelf:'center',
    borderRadius:15,
    shadowOffset: { width: 8, height: 8 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 3,
   },

   numb: {
    flexDirection:'row',
    marginLeft:15,
   },

   quantity: {
    fontWeight:700,
    fontSize:23,
    marginTop:15,
  
   },

   confirm:{
    fontSize:30,
    fontWeight:700,
    color:'white',
    textAlign:'center',
    paddingBottom:30
   }
})