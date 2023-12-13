import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firebase';
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';

export default function Menu() {


  const navigation = useNavigation()

  const [burgers, setBurgers] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [pizza, setPizza] = useState([]);
  const [fish, setFish] = useState([]);
  const [tacos, setTacos] = useState([]);
  const [pasta, setPasta] = useState([]);
  const [all, setAll] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  //store the state of the selected category
  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  }

  const getAll = async() => {
    try {
      const pizzaData = await fetchcategory("pizza");
      const burgerData = await fetchcategory("burgers");
      const drinksData = await fetchcategory("drinks");
      const fishData = await fetchcategory("fish");
      const pastaData = await fetchcategory("pasta");
      const tacosData = await fetchcategory("tacos");

      const allData = [...pizzaData, ...burgerData, ...drinksData, ...fishData, ...pastaData, ...tacosData];

      setAll(allData);
      setBurgers(burgerData);

    } catch (error) {
      console.log("Error fetching all data:", error);
    }
  }
  
  const fetchcategory = async (category) => {
    try {
      const querySnapshot = await getDocs(collection(db, category));
      const newData = querySnapshot.docs.map(async(doc) => {
        const itemData = doc.data();
            return {
              id: doc.id,
            ...itemData, 
            }
          });
          return Promise.all(data)
      console.log(newData);
    } catch (error) {
      alert('error')
      console.error("Error fetching menu: ", error);
    }
  };

  const fetchBurgers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "burgers"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBurgers(newData);
      console.log(newData);
    } catch (error) {
      alert('error')
      console.error("Error fetching menu: ", error);
    }
  };

  useEffect(() => {
    //getAll();
    fetchBurgers();
  }, []);

  const fetchDrinks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "drinks"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDrinks(newData);
      console.log(newData);
    } catch (error) {
      alert('error')
      console.error("Error fetching menu: ", error);
    }
  };

  useEffect(() => {
    //getAll();
    fetchDrinks();
  }, []);

  const fetchPasta = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pasta"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPasta(newData);
      console.log(newData);
    } catch (error) {
      alert('error')
      console.error("Error fetching menu: ", error);
    }
  };

  useEffect(() => {
    //getAll();
    fetchPasta();
  }, []);

  const fetchTacos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tacos"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTacos(newData);
      console.log(newData);
    } catch (error) {
      alert('error')
      console.error("Error fetching menu: ", error);
    }
  };

  useEffect(() => {
    //getAll();
    fetchTacos();
  }, []);

  const fetchPizza = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pizza"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPizza(newData);
      console.log(newData);
    } catch (error) {
      alert('error')
      console.error("Error fetching menu: ", error);
    }
  };

  useEffect(() => {
    //getAll();
    fetchPizza();
  }, []);

  const fetchFish = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "fish"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setFish(newData);
      console.log(newData);
    } catch (error) {
      alert('error')
      console.error("Error fetching menu: ", error);
    }
  };

  useEffect(() => {
    //getAll();
    fetchFish();
  }, []);

   const handleItemPress = (selectedItem) => {
    navigation.navigate("Description", {foodItem: selectedItem})
   };

  const handleSignOut = async () => {
    try {   
      await auth.signOut(); // Sign out the user
      alert('User signed out successfully');
      navigation.navigate("Login");
      // You can navigate the user to another screen or update your UI as needed
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
   
  return (
    <View style={styles.container}>
            <ScrollView stickyHeaderIndices={[0]}>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image style={styles.logo} source={require('../assets/user.png')} />
        </TouchableOpacity>
        <Text style={styles.maintitle}>Food App </Text>
        <TouchableOpacity onPress={handleSignOut}>
        <Image
          style={styles.cart}
          source={require('../assets/logout.png')}
         
        /></TouchableOpacity>
      </View>
      <Text style={styles.title}>What would you like to eat ?</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.all, selectedCategory === "All" && styles.all_selected]} onPress={() => handleSelectedCategory("All")}><Text>All</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.pizza, selectedCategory === "Pizza" && styles.pizza_selected]} onPress={() => handleSelectedCategory("Pizza")}><Text>Pizza</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.burger,selectedCategory === "Burger" && styles.burger_selected]}  onPress={() => handleSelectedCategory("Burger")}><Text>Burger</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tacos,selectedCategory === "Tacos" && styles.tacos_selected]} onPress={() => handleSelectedCategory("Tacos")}><Text>Tacos</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.pasta,selectedCategory === "Pasta" && styles.pasta_selected]} onPress={() => handleSelectedCategory("Pasta")}><Text>Pasta</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.fish,selectedCategory === "Fish" && styles.fish_selected]} onPress={() => handleSelectedCategory("Fish")}><Text>Fish</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.drinks,selectedCategory === "Drinks" && styles.drinks_selected]} onPress={() => handleSelectedCategory("Drinks")}><Text>Drinks</Text></TouchableOpacity>
      </View>
      

    {selectedCategory === "All" &&(
    <>
    <Text style={styles.subtitle}>Burgers</Text>
      <View style={styles.cardrow}>
        <ScrollView horizontal={true}>
          {burgers.map((burger) => (
            <View key={burger.id}>
            <TouchableOpacity key={burger.id} onPress={() => handleItemPress(burger)} style={styles.that}>
              <View style={styles.row1}>
                <Image
                  style={styles.card1}
                  source={burger.image}

                />
                <Text style={styles.cardTexts1}>{burger.name}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))},
        </ScrollView>

      </View>


      <Text style={styles.subtitle}>Pizza</Text>
      <View style={styles.cardrow}>
        <ScrollView horizontal={true}>
          {pizza.map((pizza) => (
            <View key={pizza.id}>
            <TouchableOpacity key={pizza.id} onPress={() => handleItemPress(pizza)} style={styles.that}>
              <View style={styles.row1}>
                <Image
                  style={styles.card1}
                  source={pizza.image}

                />
                <Text style={styles.cardTexts2}>{pizza.name}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))},
        </ScrollView>

      </View>

      <Text style={styles.subtitle}>Fish</Text>
      <View style={styles.cardrow}>
        <ScrollView horizontal={true}>
          {fish.map((fish) => (
            <View key={fish.id}>
            <TouchableOpacity key={fish.id} onPress={() => handleItemPress(fish)} style={styles.that}>
              <View style={styles.row1}>
                <Image
                  style={styles.card1}
                  source={fish.image}

                />
                <Text style={styles.cardTexts}>{fish.name}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))},
        </ScrollView>

      </View>

      <Text style={styles.subtitle}>Drinks</Text>
      <View style={styles.cardrow}>
        <ScrollView horizontal={true}>
          {drinks.map((drinks) => (
            <View key={drinks.id}>
            <TouchableOpacity key={drinks.id} onPress={() => handleItemPress(drinks)} style={styles.that}>
              <View style={styles.row1}>
                <Image
                  style={styles.card1}
                  source={drinks.image}

                />
                <Text style={styles.cardTexts}>{drinks.name}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))},
        </ScrollView>

      </View>

      <Text style={styles.subtitle}>Tacos</Text>
      <View style={styles.cardrow}>
        <ScrollView horizontal={true}>
          {tacos.map((tacos) => (
            <View key={tacos.id}>
            <TouchableOpacity key={tacos.id} onPress={() => handleItemPress(tacos)} style={styles.that}>
              <View style={styles.row1}>
                <Image
                  style={styles.card1}
                  source={tacos.image}

                />
                <Text style={styles.cardTexts}>{tacos.name}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))},
        </ScrollView>

      </View>

      <Text style={styles.subtitle}>Pasta</Text>
      <View style={styles.cardrow}>
        <ScrollView horizontal={true}>
          {pasta.map((tacos) => (
            <View key={tacos.id}>
            <TouchableOpacity key={tacos.id} onPress={() => handleItemPress(tacos)} style={styles.that}>
              <View style={styles.row1}>
                <Image
                  style={styles.card1}
                  source={tacos.image}

                />
                <Text style={styles.cardTexts}>{tacos.name}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))},
        </ScrollView>

      </View>
    </>
    )}

      {selectedCategory === "Burger" && (
      <>
      <Text style={styles.subtitle}>Burgers</Text>
      <View style={styles.cardrow}>
        
          {burgers.map((burger) => (
            <View key={burger.id}>
            <TouchableOpacity key={burger.id} onPress={() => handleItemPress(burger)} style={styles.that}>
              <View style={styles.row1}>
                <Image
                  style={styles.card1}
                  source={burger.image}

                />
                <Text style={styles.cardTexts1}>{burger.name}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))},
        

      </View>
      </>
      )}

      {selectedCategory === "Pizza" && (
      <>
      <Text style={styles.subtitle}>Pizza</Text>
      <View style={styles.cardrow}>
        
          {pizza.map((pizza) => (
            <View key={pizza.id}>
            <TouchableOpacity key={pizza.id} onPress={() => handleItemPress(pizza)} style={styles.that}>
              <View style={styles.row1}>
                <Image
                  style={styles.card1}
                  source={pizza.image}

                />
                <Text style={styles.cardTexts2}>{pizza.name}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))},
        
         {selectedCategory === "" && (<></>)}
      </View>
      </>
      )}
      
      {selectedCategory === "Fish" && (
      <>
      <Text style={styles.subtitle}>Fish</Text>
      <View style={styles.cardrow}>
        
          {fish.map((fish) => (
            <View key={fish.id}>
            <TouchableOpacity key={fish.id} onPress={() => handleItemPress(fish)} style={styles.that}>
              <View style={styles.row1}>
                <Image
                  style={styles.card1}
                  source={fish.image}

                />
                <Text style={styles.cardTexts}>{fish.name}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))},

      </View>
      </>
      )}


      {selectedCategory === "Tacos" && (
      <>
      <Text style={styles.subtitle}>Tacos</Text>
      <View style={styles.cardrow}>
        
          {tacos.map((tacos) => (
            <View key={tacos.id}>
            <TouchableOpacity key={tacos.id} onPress={() => handleItemPress(tacos)} style={styles.that}>
              <View style={styles.row1}>
                <Image
                  style={styles.card1}
                  source={tacos.image}

                />
                <Text style={styles.cardTexts}>{tacos.name}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))},
       

      </View>
      </>
      )}
      {selectedCategory === "Pasta" && (
      <>
       <Text style={styles.subtitle}>Pasta</Text>
      <View style={styles.cardrow}>
       
          {pasta.map((tacos) => (
            <View key={tacos.id}>
            <TouchableOpacity key={tacos.id} onPress={() => handleItemPress(tacos)} style={styles.that}>
              <View style={styles.row1}>
                <Image
                  style={styles.card1}
                  source={tacos.image}

                />
                <Text style={styles.cardTexts}>{tacos.name}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))},
        

      </View>
      </>
      )}

      {selectedCategory === "Drinks" && (
      <>
      <Text style={styles.subtitle}>Drinks</Text>
      <View style={styles.cardrow}>
        
          {drinks.map((drinks) => (
            <View key={drinks.id}>
            <TouchableOpacity key={drinks.id} onPress={() => handleItemPress(drinks)} style={styles.that}>
              <View style={styles.row1}>
                <Image
                  style={styles.card1}
                  source={drinks.image}

                />
                <Text style={styles.cardTexts}>{drinks.name}</Text>
              </View>
            </TouchableOpacity>
            </View>
          ))},
        

      </View>

      </>
      )}
     </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },

  maintitle: {
   fontSize:25,
   fontWeight:800,
  },

  logo: {
    width: 30,
    height: 30,
  },

  cart: {
    width: 30,
    height: 30,
    marginLeft: 260,
  },

  icons: {
    borderWidth: 3,
    flexDirection: 'row',
    borderColor: 'white',
    borderBottomColor: 'lightgray',
    paddingBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 9,
  },

  buttons: {
    flexDirection: 'row',
    marginTop: 12,
  },

  fish: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },

  fish_selected: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor:'yellow'
  },

  pasta: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },

  pasta_selected: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor:'yellow'
  },

  tacos: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },

  tacos_selected: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor:'yellow'
  },

  burger_selected: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor:'yellow'
  },

  burger: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },

  pizza: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },

  pizza_selected: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor:'yellow'
  },


  drinks: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },

  drinks_selected:{
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor:'yellow'
  },

  

  all: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },

  all_selected: {
    marginLeft: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "yellow"
  },

  subtitle: {
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 12,
    marginTop: 13,
  },

  card1: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },

  cardTexts: {
    fontWeight: 700,
  },

  cardTexts1: {
    fontWeight:700,
    width:90,
  },

  cardTexts2: {
    fontWeight:700,
    width:90,
  },

  cardrow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },

  row2: {
    marginLeft: 15,
  },

  row3: {
    marginLeft: 15,
  },

  that:{ 
    padding:9,
  }
});