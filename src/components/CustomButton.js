import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const CustomButton = props => {
  const {handlePress, title, width, bgColor, textColor} = props;

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${width} p-4 content-center items-center self-center mt-8 ${bgColor} rounded-xl`}>
      <Text className={`${textColor} font-bold text-md`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
