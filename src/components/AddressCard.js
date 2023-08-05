import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';

const AddressCard = ({
  navigation,
  item,
  setSelectedAddress,
  selectedAddress,
}) => {
  const {
    isDefault,
    contactName,
    contactNumber,
    street,
    city,
    pincode,
    state,
    id,
  } = item;
  return (
    <TouchableOpacity
      className="mt-4 bg-white p-2"
      onPress={() => {
        setSelectedAddress(item);
      }}>
      {isDefault && (
        <Text className="text-purple-800 font-semibold text-md">DEFAULT</Text>
      )}
      <View className="flex-row justify-between items-center">
        <Text className="text-black font-semibold text-xl">{contactName}</Text>
        {selectedAddress !== undefined && (
          <Text>{selectedAddress.id === id ? '✅' : ''}</Text>
        )}
      </View>
      <View className="flex-row w-full justify-between items-end">
        <View className="w-9/12">
          <Text className="text-black text-md mt-2">{street}</Text>
          <Text className="text-black text-md">
            {city} - {pincode}, {state}
          </Text>
          <Text className="text-black text-md">{contactNumber}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddAddress', {
              addressId: id,
              screenType: 'edit',
            })
          }>
          <Text className="text-purple-800">Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default AddressCard;
