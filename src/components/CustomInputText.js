import {View, TextInput} from 'react-native';
import React from 'react';

const CustomInputText = props => {
  const {placeholder, value, handleChange, type, width, handleFocus, textType} =
    props;

  return (
    <View className={`border-2 rounded-lg mt-8 p-1 h-14 ${width}`}>
      <TextInput
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={placeholder}
        onChangeText={handleChange}
        value={value}
        keyboardType={type ? type : 'default'}
        className="text-black"
        placeholderTextColor="black"
        secureTextEntry={textType === 'password' ? true : false}
        // onFocus={handleFocus}
      />
    </View>
  );
};

export default CustomInputText;
