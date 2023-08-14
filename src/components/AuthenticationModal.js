import React from 'react';
import {View, Text, Modal} from 'react-native';
import CustomButton from './CustomButton';

const AuthenticationModal = props => {
  const {onCancel, onHandleLogin, isVisible, type} = props;

  return (
    <Modal visible={isVisible} transparent>
      <View className="w-screen h-screen absolute justify-center items-center bg-black/70">
        <View className="rounded-lg justify-center items-center py-4 bg-gray-200 w-10/12">
          <Text className="text-black text-2xl">
            {type === 'cart'
              ? ' Want to add Product in cart?'
              : ' Want to wishlist items'}
          </Text>
          <Text className="text-black text-md my-2">
            Please Login or Sign Up
          </Text>
          <CustomButton
            title="Login"
            style="w-9/12 mb-4 bg-purple-800"
            handlePress={onHandleLogin}
            textColor="text-white"
          />
          <CustomButton
            title="Cancel"
            style="w-9/12 bg-white"
            handlePress={onCancel}
            textColor="text-purple-800"
          />
        </View>
      </View>
    </Modal>
  );
};

export default AuthenticationModal;
