import React, {useEffect, useContext, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../context/AuthContext';
import {AddressContext} from '../context/AddressContext';
import {useIsFocused} from '@react-navigation/native';

const Address = ({navigation}) => {
  const {userData} = useContext(AuthContext);
  const {addressList, getAddress, handleSelectedAddress, selectedAddress} =
    useContext(AddressContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    getAddress(userData.id);
  }, [isFocused]);

  const [refreshFlatlist, setRefreshFlatList] = useState();

  const renderAddressCard = item => (
    <TouchableOpacity
      className="mt-4 bg-white p-2"
      onPress={() => handleSelectedAddress(item)}>
      {item.defaultAddress && (
        <Text className="text-purple-800 font-semibold text-md">DEFAULT</Text>
      )}
      <View className="flex-row justify-between items-center">
        <Text className="text-black font-semibold text-xl">
          {item.contactName}
        </Text>
        {selectedAddress !== undefined && (
          <Text>{selectedAddress.id === item.id ? '✅' : ''}</Text>
        )}
      </View>
      <View className="flex-row w-full justify-between items-end">
        <View className="w-9/12">
          <Text className="text-black text-md mt-2">{item.street}</Text>
          <Text className="text-black text-md">
            {item.city} - {item.pincode}, {item.state}
          </Text>
          <Text className="text-black text-md">{item.contactNumber}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddAddress', {
              addressId: item.id,
              screenType: 'edit',
            })
          }>
          <Text className="text-purple-800">Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="p-4">
      <TouchableOpacity
        className="border-b-2 border-gray-300 pb-4"
        onPress={() => navigation.navigate('AddAddress')}>
        <Text className="text-purple-800 font-bold text-xl">
          + Add New Address
        </Text>
      </TouchableOpacity>
      <FlatList
        data={addressList}
        renderItem={({item}) => renderAddressCard(item._data)}
        keyExtractor={item => item._data.id}
        extraData={refreshFlatlist}
      />
    </View>
  );
};

export default Address;
