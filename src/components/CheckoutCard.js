import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const CheckoutCard = ({totalAmount}) => {
  const navigation = useNavigation();

  return (
    <View className="w-full h-16 absolute bottom-0 flex-row justify-between">
      <View className="bg-white w-6/12 h-full pl-4 pt-2">
        <Text className="text-sm text-black font-semibold">Grand Total</Text>
        <Text className="font-bold ml-6 text-lg text-black">₹ {totalAmount}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('checkout')}
        className="w-6/12 items-center justify-center bg-purple-800 h-full">
        <Text className="text-lg text-white">Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutCard;
