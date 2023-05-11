import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./Screens/Home";
import Search from "./Screens/Search";
import Payment from "./Screens/Payment";
import Cart from "./Screens/Cart";
import Profile from "./Screens/Profile";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator 
            screenOptions = {{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: [
                  {
                    display: "flex"
                  },
                  null
                ]
              }}
            tabBarOptions = {{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: "#ffffff",
                    borderRadius: 15,
                    height: 100,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={Home}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View stlye={{alignItems: 'center', justifyContent: 'center', top: 10}} >
                            <Image
                                source={require('./assets/home.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#f4511e" : "#748c94",
                                }}
                            />
                        </View>
                    )
                }} 
            />
            <Tab.Screen 
                name="Search" 
                component={Search}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View stlye={{alignItems: 'center', justifyContent: 'center', top: 10}} >
                            <Image
                                source={require('./assets/search.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#f4511e" : "#748c94",
                                }}
                            />
                        </View>
                    )
                }} 
            />
            <Tab.Screen 
                name="Payment" 
                component={Payment}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View stlye={{alignItems: 'center', justifyContent: 'center', top: 10}} >
                            <Image
                                source={require('./assets/card.png')}
                                resizeMode="center"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#f4511e" : "#748c94",
                                }}
                            />
                        </View>
                    )
                }} 
            />
            <Tab.Screen 
                name="Cart" 
                component={Cart}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View stlye={{alignItems: 'center', justifyContent: 'center', top: 10}} >
                            <Image
                                source={require('./assets/cart.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#f4511e" : "#748c94",
                                }}
                            />
                        </View>
                    )
                }} 
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View stlye={{alignItems: 'center', justifyContent: 'center', top: 10}} >
                            <Image
                                source={require('./assets/profile.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#f4511e" : "#748c94",
                                }}
                            />
                        </View>
                    )
                }} 
            />

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create ({
    shadow: {
        shadowColor: "f4511e",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 3
    }
});

export default BottomTabs;