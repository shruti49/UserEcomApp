import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const CustomButton = props => {
  const {handlePress, title, style, textColor} = props;

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${style} p-4 content-center items-center self-center rounded-xl`}>
      <Text className={`${textColor} font-bold text-md`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
