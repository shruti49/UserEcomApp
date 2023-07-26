import React, {useContext, useState} from 'react';
import {View, Button, Text} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  const [loggedInUserName, setLoggedInUserName] = useState();

  useEffect(() => {
    (async () => {
      const userName = await AsyncStorage.getItem('customerName');
      setLoggedInUserName(userName);
    })();
  }, []);

  return (
    <View>
      <Text className="text-black">{loggedInUserName}</Text>
      <Button
        onPress={() => {
          logout();
          navigation.navigate('Home');
        }}
        title="Logout"
      />
    </View>
  );
};

export default Profile;
