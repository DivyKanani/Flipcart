import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeDB } from './DBA/DBAdapter';

import Login from './Components/Login';
import Home from './Screens/Home'
import BottomTabs from './BottomTabs'

const Stack = createStackNavigator();


const App = () => {

  useEffect(()=> {
    initializeDB()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} /> 
        <Stack.Screen name="BottomTabs" component={BottomTabs}  options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
