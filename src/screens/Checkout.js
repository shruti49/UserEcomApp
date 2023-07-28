import {View, Text} from 'react-native';
import React from 'react';
import CheckoutCard from '../components/CheckoutCard';
import AddressCard from '../components/AddressCard';

const Checkout = ({navigation}) => {
  return (
    <View className="flex-1 items-center">
      <CheckoutCard />
      <AddressCard navigation={navigation} />
    </View>
  );
};

export default Checkout;
