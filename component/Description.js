import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';

export default function Description() {
  const navigation = useNavigation();

  const route = useRoute();
  const { foodItem } = route.params

  const [size, setSize] = useState("Small")
  const [availableSizes, setAvaliableSizes] = useState({
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
  })

  const [stateSize, setStateSize] = useState({})

 const [selectedSize, setSelectedSize] = useState("")

  const sizeT = ((sizeChosen) => {
     
  const updateState ={}
  Object.keys(availableSizes).forEach((key) => {
    updateState[key] = "letter"
  })
   
  if (selectedSize === sizeChosen){
    setSize("Small")
  } else{
    setSize(sizeChosen) 
    updateState[sizeChosen] = "letterClicked"
  }

  setStateSize(updateState)


  })

  
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);

  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <Image
            style={styles.logo}

            source={require('../assets/arrow.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.cart}
            source={require('../assets/logout.png')}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.namefood}>{foodItem.name}</Text>

      <Image
        style={styles.pic}
        source={foodItem.image}
      />\

      <Text style={styles.description}>{foodItem.description}</Text>
      <Text style={styles.options}>{foodItem.options}</Text>
      <Text style={styles.price}>R{parseInt(foodItem.price)*count}</Text>
      <Text style={styles.pizza}>Size</Text>

      <View style={styles.size}>
        <TouchableOpacity style={[styles.letter,stateSize["Small"] ==="letterClicked" && styles.letterClicked]} key={availableSizes.Small} onPress={() => sizeT("Small")}>
          <Text >S</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.letter,stateSize["Medium"] ==="letterClicked" && styles.letterClicked]} key={availableSizes.Medium} onPress={() => sizeT("Medium")}>
          <Text >M</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.letter,stateSize["Large"] ==="letterClicked" && styles.letterClicked]} key={availableSizes.Large} onPress={() => sizeT("Large")}>
          <Text >L</Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.pizza}>Ingredients</Text>

      <View style={styles.ingredients}>
        <TouchableOpacity>
          <Image style={styles.onion} source={require('../assets/onion.png')} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.cheese}
            source={require('../assets/cheese.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.chilipepper}
            source={require('../assets/chili-pepper.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.tomato}
            source={require('../assets/tomato.png')}
          />
        </TouchableOpacity>
      </View> */}

      {/* <Text style={styles.pizza}>Quantity</Text> */}

      {/* <View style={styles.number}>
        <Image style={styles.minus} source={require('../assets/minus.png')} />
        <Text style={styles.one}>1</Text>
        <Image style={styles.plus} source={require('../assets/plus.png')} />

      </View> */}
      <View><TouchableOpacity onPress={() => setCount(initialCount)} style={styles.pizza}>
        Quantity
      </TouchableOpacity>
        <View style={styles.plusminus}>
          <TouchableOpacity onPress={() => setCount(count - 1)} style={styles.minus}>
            -
          </TouchableOpacity>
          <Text style={styles.count}>{count}</Text>
          <TouchableOpacity onPress={() => setCount(count + 1)} style={styles.plus}>
            +
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
  style={styles.select}
  onPress={() => navigation.navigate("Cart", {
    count: count,
    foodItem: {
      ...foodItem,
      total: parseInt(foodItem.price) * count, // Add the total price to the foodItem object
    },
  })}
>
  move on
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'start',
    backgroundColor: 'white'
  },

  logo: {
    width: 30,
    height: 30,
  },

  cart: {
    width: 30,
    height: 30,
    marginLeft: 330,
  },

  icons: {
    borderWidth: 3,
    flexDirection: 'row',
    borderColor: 'white',
    borderBottomColor: 'lightgray',
    paddingBottom: 10,
  },

  pizza: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 700,
    marginTop: 30,
  },

  pic: {
    width: 300,
    height: 150,
    borderRadius: 15,
    marginLeft: 17,
    marginTop: 12,
    alignSelf: 'center',
  },

  size: {
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center'
  },

  sizeButton: {
    backgroundColor:'white',
  },


  letter: {
    fontSize: 25,
    padding: 19,
    marginLeft: 12,
    borderWidth: 1,
    borderRadius: 15,
    paddingTop: 12,
    paddingBottom: 12,
  },

  letterClicked: {
    fontSize: 25,
    padding: 19,
    marginLeft: 12,
    borderWidth: 1,
    borderRadius: 15,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'yellow',
  },

  // onion: {
  //   width: 30,
  //   height: 30,
  //   borderWidth: 1,
  //   borderRadius: 10,
  // },

  // cheese: {
  //   width: 30,
  //   height: 30,
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   marginLeft: 9,
  // },

  // chilipepper: {
  //   width: 30,
  //   height: 30,
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   marginLeft: 9,
  // },

  // tomato: {
  //   width: 30,
  //   height: 30,
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   marginLeft: 9,
  // },

  // ingredients: {
  //   flexDirection: 'row',
  //   marginTop: 20,
  //   alignSelf: 'center',
  // },

  number: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
  },

  one: {
    fontWeight: 700,
    marginLeft: 10,
    marginTop: 1,
    fontSize: 20,
    marginRight: 10,
  },

  minus: {
    marginRight: 16,
    backgroundColor: 'black',
    padding: 5,
    color: 'white',
    borderRadius: 30,
    fontSize: 20,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
    paddingTop: 4
  },

  plus: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 50,
    marginLeft: 16,
    fontSize: 20,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
    paddingTop: 4
  },

  select: {
    textAlign: 'center',
    marginTop: 40,
    fontWeight: 700,
    width: 200,
    height: 40,
    alignSelf: 'center',
    paddingTop: 10,
    backgroundColor: 'yellow',
    borderRadius: 15,
    shadowOffset: { width: 8, height: 8 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 3,

  },

  namefood: {

    fontWeight: 800,
    fontSize: 30,
    textAlign: 'center',
  },

  description: {
    textAlign: 'center',
    fontWeight: 600,
  },

  options: {
    textAlign: 'center',
    fontWeight: 600,
    marginTop: 20
  },

  price: {
    fontSize: 30,
    fontWeight: 700,
    marginTop: 20,
    marginLeft: 20
  },

  plusminus: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 20,
  },


  count: {
    fontWeight: 800,
    fontSize: 25
  }
});
