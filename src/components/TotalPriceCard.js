import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CartContext} from '../context/CartContext';

const TotalPriceCard = ({navigation}) => {
  const {getTotalCartAmount, cartItemList} = useContext(CartContext);
  return (
    <View className="w-full h-16 absolute bottom-0 flex-row justify-between">
      <View className="bg-white w-6/12 h-full pl-6 pt-2">
        <Text className="text-sm text-black font-semibold">Grand Total</Text>
        <Text className="font-bold text-lg text-black">
          ₹ {getTotalCartAmount(cartItemList)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Checkout')}
        className="w-6/12 items-center justify-center bg-purple-800 h-full">
        <Text className="text-lg text-white">Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TotalPriceCard;
