import React from 'react';
import {View, Text, Modal} from 'react-native';
import CustomButton from './CustomButton';

const AuthenticationModal = props => {
  const {onCancel, onHandleLogin, isVisible} = props;

  return (
    <Modal visible={isVisible} transparent>
      <View className="w-screen h-screen absolute justify-center items-center bg-black/70">
        <View className="rounded-lg justify-center items-center bg-white p-4">
          <Text className="text-black text-xl">
            Want to add Product in cart?
          </Text>
          <Text className="text-black text-sm">Please Login or Sign Up</Text>
          <CustomButton
            title="Login"
            width="w-64"
            handlePress={onHandleLogin}
            bgColor="bg-purple-800"
            textColor="text-white"
          />
          <CustomButton
            title="Cancel"
            width="w-64"
            handlePress={onCancel}
            bgColor="bg-white"
            textColor="text-purple-800"
          />
        </View>
      </View>
    </Modal>
  );
};

export default AuthenticationModal;
