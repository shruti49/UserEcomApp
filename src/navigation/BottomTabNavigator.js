import {useEffect, useContext, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-eva-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {CartContext} from '../context/CartContext';
import Checkout from '../screens/Checkout';
import Home from '../tabs/Home';
import Search from '../tabs/Search';
import Wishlist from '../tabs/Wishlist';
import Profile from '../tabs/Profile';
import Cart from '../tabs/Cart';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {cartLength} = useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 76,
        },
        tabBarLabelStyle: {fontSize: 16},
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          size = 32;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart-outline';
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return (
            <Icon name={iconName} width={size} height={size} fill={color} />
          );
        },
        tabBarActiveTintColor: 'rgb(107 33 168)',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{title: 'Search'}}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={cartLength > 0 && {tabBarBadge: cartLength}}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{title: 'Wishlist'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
