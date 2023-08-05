import React, {useEffect, useContext, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {AddressContext} from '../context/AddressContext';
import {useIsFocused} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import AddressCard from '../components/AddressCard';
import Loader from '../components/Loader';
const Address = ({navigation}) => {
  const {userData} = useContext(AuthContext);
  const {
    addressList,
    getAddress,
    shippingAddress,
    handleSelectedAddress,
    loaderVisible,
  } = useContext(AddressContext);
  const [selectedAddress, setSelectedAddress] = useState(shippingAddress);
  const isFocused = useIsFocused();
  const [refreshFlatlist, setRefreshFlatList] = useState();

  useEffect(() => {
    getAddress(userData.id);
  }, [isFocused]);

  const renderAddressCard = item => (
    <AddressCard
      navigation={navigation}
      item={item}
      setSelectedAddress={setSelectedAddress}
      selectedAddress={selectedAddress}
    />
  );

  return (
    <View className="flex-1 p-4">
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
      {addressList.length > 0 && (
        <CustomButton
          title="Ship to this address"
          width="w-full"
          bgColor="bg-purple-800"
          textColor="text-white"
          handlePress={() => handleSelectedAddress(selectedAddress, navigation)}
        />
      )}
      <Loader isVisible={loaderVisible} />
    </View>
  );
};

export default Address;
