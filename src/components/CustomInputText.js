import React from 'react';
import {View, TextInput} from 'react-native';

const CustomInputText = props => {
  const {placeholder, value, handleChange, type, width, multiline, textType} =
    props;

  return (
    <View
      className={`border-2 rounded-lg mt-8 p-1 ${
        multiline ? 'h-24' : 'h-14'
      } ${width}`}>
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
        multiline={multiline}
        // onFocus={handleFocus}
      />
    </View>
  );
};

export default CustomInputText;
