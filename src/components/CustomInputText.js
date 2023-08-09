import React from 'react';
import {View, TextInput} from 'react-native';

const CustomInputText = props => {
  const {placeholder, value, handleChange, type, style, multiline, textType} =
    props;

  return (
    <View
      className={`border-2 rounded-lg p-1 ${
        multiline ? 'h-24' : 'h-14'
      } ${style}`}>
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
      />
    </View>
  );
};

export default CustomInputText;
