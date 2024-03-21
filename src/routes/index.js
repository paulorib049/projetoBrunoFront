import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from '../pages/WelcomeScreen/WelcomeScreen';
import AuthScreens from '../pages/AuthScreens/AuthScreens';
import ProductScreen from '../pages/ProductScreens/ProductScreen';
import Cart from '../pages/Cart/Cart';
import Chat from '../pages/Chat/Chat';
import CreateAccount from '../pages/CreateAccount/CreateAccount';
import User from '../pages/UserScreen/UserScreen';
import Favorites from '../pages/Favorites/Favorites';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthScreens"
        component={AuthScreens}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ headerShown: false }}
      />
            <Stack.Screen
        name="User"
        component={User}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    
  );
}
