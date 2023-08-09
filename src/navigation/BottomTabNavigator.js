import {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-eva-icons';

import {CartContext} from '../context/CartContext';

import Home from '../tabs/Home';
import Wishlist from '../tabs/Wishlist';
import Account from '../tabs/Account';
import Cart from '../tabs/Cart';

import {AuthContext} from '../context/AuthContext';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {userData} = useContext(AuthContext);
  const {cartLength} = useContext(CartContext);
  const {fetchCartItems} = useContext(CartContext);

  useEffect(() => {
    fetchCartItems(userData.id);
  }, [userData,cartLength]);

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
          } else if (route.name === 'Cart') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart-outline';
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Account') {
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
        name="Account"
        component={Account}
        options={{title: 'Account'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
