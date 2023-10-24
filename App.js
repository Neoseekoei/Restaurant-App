import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// or any files within the Snack

import Login from './component/Login';
import Registration from './component/Registration';
import Payment from './component/Payment';
import Description from './component/Description';
import ForgotPassword from './component/ForgotPassword';
import Welcome from './component/Welcome';
import Menu from './component/Menu';
import Cart from './component/Cart';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Description" component={Description} />
        <Stack.Screen name="ForgotPassword" component={ ForgotPassword} />
        <Stack.Screen name="Cart" component={ Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    backgroundColor: '#ffff',
    padding: 8,
  },
});
