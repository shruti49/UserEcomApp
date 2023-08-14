import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {Icon} from 'react-native-eva-icons';
import {FlatList} from 'react-native-gesture-handler';

const Account = ({navigation}) => {
  const {logout, userData} = useContext(AuthContext);

  const itemList = [
    {
      name: 'Orders',
    },
    {
      name: 'Address',
    },
    {
      name: 'Profile',
    },
    {
      name: 'About Us',
    },
    {
      name: 'Logout',
    },
  ];

  const renderList = item => {
    return (
      <TouchableOpacity
        className="bg-white mt-4 p-4 w-screen rounded-md"
        onPress={() => {
          if (item.name === 'Logout') {
            logout(navigation);
          } else {
            navigation.navigate(item.name);
          }
        }}>
        <Text className="text-black font-bold text-lg">{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 items-center mt-4">
      <View className="border-2 rounded-full p-2">
        <Icon name="person" width={108} height={108} />
      </View>
      <Text className="text-black mt-2 font-bold text-xl">
        {userData.name ? userData.name : 'Hello User'}
      </Text>
      <Text className="text-black font-bold text-xl">
        {userData.email ? userData.email : ''}
      </Text>
      {userData.id ? (
        <FlatList
          className="my-4"
          data={itemList}
          renderItem={({item}) => renderList(item)}
        />
      ) : (
        <TouchableOpacity
          className="bg-white mt-4 p-4 w-11/12 rounded-md"
          onPress={() => navigation.navigate('AboutUs')}>
          <Text className="text-black font-bold text-lg">About Us</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Account;
