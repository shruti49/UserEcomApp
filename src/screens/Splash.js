import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.navigate('home'), 2000);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-purple-800">
      <StatusBar className=" bg-purple-800" barStyle={'light-content'} />
      <Text className="text-white text-3xl font-bold">Ecom User App</Text>
    </View>
  );
};

export default Splash;
