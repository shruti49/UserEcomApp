import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import CustomButton from './CustomButton';
import {AddressContext} from '../context/AddressContext';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShippingCard = ({navigation}) => {
  const {shippingAddress} = useContext(AddressContext);

  if (shippingAddress === undefined) {
    return (
      <CustomButton
        style="w-11/12 bg-white"
        title="Select or Add Shipment Address"
        textColor="text-purple-800"
        handlePress={() => navigation.navigate('Address')}
      />
    );
  }

  const {city, contactName, contactNumber, pincode, state, street} =
    shippingAddress;
  return (
    <View
      className="w-11/12 bg-purple-100 rounded-md p-4"
      style={{elevation: 5}}>
      <View className="flex-row items-center">
        <Text className="font-medium text-lg text-black">Deliver to</Text>
        <Text className="text-black font-bold text-lg"> {contactName}</Text>
      </View>
      <View className="mb-4">
        <Text className="text-gray-600">{street}</Text>
        <Text className="text-gray-600">{city}</Text>
        <Text className=" text-black">
          {state} - {pincode}
        </Text>
        <Text className="text-black">{contactNumber}</Text>
      </View>
      <CustomButton
        style="w-11/12 bg-white"
        title="Change or Add Address"
        textColor="text-purple-800"
        handlePress={() => navigation.navigate('Address')}
      />
    </View>
  );
};

export default ShippingCard;
