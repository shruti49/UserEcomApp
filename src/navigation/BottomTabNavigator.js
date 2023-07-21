import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Icon} from 'react-native-eva-icons';

import Home from '../tabs/Home';
import Search from '../tabs/Search';
import Wishlist from '../tabs/Wishlist';
import Profile from '../tabs/Profile';
import Cart from '../tabs/Cart';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 80,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'cart') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart-outline';
          } else if (route.name === 'wishlist') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return (
            <Icon name={iconName} width={size} height={size} fill={color} />
          );
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="cart" component={Cart} />
      <Tab.Screen name="wishlist" component={Wishlist} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
