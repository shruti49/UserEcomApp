import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import CustomButton from './CustomButton';

const AddressCard = ({navigation}) => {
  const {userData} = useContext(AuthContext);
  return (
    <View
      className="w-11/12 bg-purple-100 rounded-md my-4 p-4"
      style={{elevation: 5}}>
      <View className="flex-row items-center">
        <Text className="font-bold text-lg text-black">Deliver to</Text>
        <Text className="text-black"> {userData.name}, 110053</Text>
      </View>
      <Text className="text-black">adress</Text>
      <Text className="text-black">city</Text>
      <Text className="text-black">state - 110053</Text>
      <Text className="text-black">9876543210</Text>
      <CustomButton
        width="w-11/12"
        title="Change or Add Address"
        bgColor="bg-white"
        textColor="text-purple-800"
        handlePress={() => navigation.navigate('Address')}
      />
    </View>
  );
};

export default AddressCard;
