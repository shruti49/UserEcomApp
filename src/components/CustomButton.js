import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const CustomButton = props => {
  const {handlePress, title, width, color} = props;

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${width} p-4 content-center items-center self-center mt-8 ${color} rounded-xl`}>
      <Text className="text-xl text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
