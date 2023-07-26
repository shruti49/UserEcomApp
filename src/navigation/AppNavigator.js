import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Splash from '../screens/Splash';
import BottomTabNavigator from './BottomTabNavigator';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Checkout from '../screens/Checkout';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
