import {View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';

const Loader = ({isVisible}) => {
  return (
    <Modal visible={isVisible} transparent>
      <View className="w-screen h-screen absolute justify-center items-center bg-black/40 ">
        <View className="w-20 h-20 rounded-lg justify-center items-center bg-white">
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
