import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-eva-icons';

const Success = ({navigation}) => {

  return (
    <View className="flex-1 items-center m-4 justify-center">
      <View className="border-2 rounded-full p-2">
        <Icon name="checkmark-circle-2" width={108} height={108} fill="green" />
      </View>
      <Text className="text-black mt-2 text-lg font-semibold">Congratulations</Text>
      <Text className="text-black m-4 text-xl font-bold">Your order is placed successfully!!</Text>
      <TouchableOpacity
        className="bg-purple-800 rounded-md p-4"
        onPress={() => navigation.navigate('Home')}
        style={{elevation: 2}}>
        <Text className="text-white font-semibold text-xl">Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;
