import { Text, View, StyleSheet, Image,ImageBackground,TouchableOpacity } from 'react-native';
import {useNavigation} from "@react-navigation/native";

export default function Welcome() {

  const navigation=useNavigation()
  return (
    <View style={styles.container}>
    <ImageBackground source={require('../assets/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese.jpg')} style={styles.background}/>
    <Image source={require('../assets/christmas.jpg')} style={styles.logo}/>

    <TouchableOpacity style={styles.login}  onPress={()=> navigation.navigate("Login")}><Text>LOGIN</Text></TouchableOpacity>
    <TouchableOpacity style={styles.signup} onPress={()=> navigation.navigate("Registration")}><Text>SIGN UP</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor:'#FFC224',
    paddingBottom:130,
  },

   background: {
     width:350,
     height:640,
     marginTop:-24,
   },

   logo: {
     width:200,
     height:200,
     marginTop:-500,
     borderRadius:30,
   },

   login: {
     width:170,
     borderWidth:1,
     padding:15,
     backgroundColor:'#ffff',
     marginTop:200,
     borderRadius:15,
     borderColor:'white',
     textAlign:'center',
     fontWeight:800,
     fontFamily:'Sans-serif',
     shadowOffset: { width: 8, height: 8 },
     shadowColor: 'black',
     shadowOpacity: 0.8,
     shadowRadius: 3,
     paddingLeft:60
   },

   signup: {
    
     width:170,
     borderWidth:1,
     padding:15,
     backgroundColor:'#ffff',
     marginTop:30,
     borderRadius:15,
     borderColor:'white',
     textAlign:'center',
     fontWeight:800,
     fontFamily:'Sans-serif',
     shadowOffset: { width: 8, height: 8 },
     shadowColor: 'black',
     shadowOpacity: 0.8,
     shadowRadius: 3,
     paddingLeft:60
   }
});