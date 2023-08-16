import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Splash from '../screens/Splash';
import BottomTabNavigator from './BottomTabNavigator';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Checkout from '../screens/Checkout';
import Address from '../screens/Address';
import AddAddress from '../screens/AddAddress';
import Success from '../screens/Success';
import Orders from '../screens/Orders';
import AboutUs from '../screens/AboutUs';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign-Up" component={SignUp} />
        <Stack.Screen name="home" component={BottomTabNavigator} />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{headerShown: true, title: 'Select Shipping Address'}}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{headerShown: true, title: 'Enter Address'}}
        />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: true, title: 'Your Orders'}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
