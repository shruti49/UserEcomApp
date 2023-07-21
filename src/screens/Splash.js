import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.navigate('home'), 2000);
  }, []);

  // const checkAuth = async () => {
  //   const userId = await AsyncStorage.getItem('userId');
  //   if (userId !== null) navigation.navigate('home');
  //   else navigation.navigate('login');
  // };

  return (
    <View className="flex-1 items-center justify-center bg-purple-800">
      <StatusBar className=" bg-purple-800" barStyle={'light-content'} />
      <Text className="text-white text-3xl font-bold">Ecom User App</Text>
    </View>
  );
};

export default Splash;
