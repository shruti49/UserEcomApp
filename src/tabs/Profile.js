import React, {useContext, useState} from 'react';
import {View, Button, Text} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const Profile = ({navigation}) => {
  const {logout, userData} = useContext(AuthContext);

  return (
    <View>
      <Text className="text-black">{userData.name ? userData.name : ''}</Text>
      {userData.id && (
        <Button onPress={() => logout(navigation)} title="Logout" />
      )}
    </View>
  );
};

export default Profile;
