import React, { useEffect, createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeDB } from './DBA/DBAdapter';

import Login from './Components/Login';
import Home from './Screens/Home'
import ChangePassword from './Components/ChangePassword';
import BottomTabs from './BottomTabs';
import ProductInfoScreen from './Components/ProductInfoScreen';
import ManageOrder from './Components/ManageOrder';


const Stack = createStackNavigator();
 export const GlobalContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([])
  const [creditCard, setCreditCard] = useState([])
  const [orders, setOrders] = useState([])
  const addToCart = (item) => {
        
    setCart([...cart, item]);
};
const addToCreditCard = (item) => {
        
  setCreditCard([...creditCard, item]);
};

const addToOrder = (item) => {
  setOrders([...orders,item])
}
  const loginUser = (username) => {
    const user = { id: 1, name: username};
    setUser(user);
  };

  const logoutUser = () => {
    setUser(null);
  };

  useEffect(()=> {
    initializeDB()
  }, [])

  return (
    <GlobalContext.Provider value={{user, loginUser, logoutUser, cart,setCart ,addToCart, creditCard, addToCreditCard, orders, addToOrder}} >
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} /> 
        <Stack.Screen name="Back" component={BottomTabs}  options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown: false}} />
        <Stack.Screen name="ProductInfoScreen" component={ProductInfoScreen} options={{headerShown: true}} />
        <Stack.Screen name="ManageOrder" component={ManageOrder} options={{headerShown: true}} />
      </Stack.Navigator>
    </NavigationContainer>
    </GlobalContext.Provider>
  );
};

export default App;
