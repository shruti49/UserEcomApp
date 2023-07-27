import React, {useState, useContext} from 'react';
import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
import CustomInputText from '../components/CustomInputText';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import {AuthContext} from '../context/AuthContext';

const Login = ({navigation}) => {
  const {loginUser, loaderVisible} = useContext(AuthContext);

  const defaultFields = {
    email: '',
    password: '',
  };

  const [formFields, setFormFields] = useState(defaultFields);

  const {email, password} = formFields;

  const handleInput = (inputValue, inputName) => {
    setFormFields({...formFields, [inputName]: inputValue});
  };

  const inputValidation = () => {
    if (!email || !password) {
      return false;
    }

    return true;
  };

  return (
    <View className="flex-1 items-center">
      <Image
        source={require('../../images/banner.jpg')}
        className="w-full h-56"
      />
      <View
        className="w-[95%] h-full items-center bg-white absolute top-48 rounded-t-[40px]"
        style={{elevation: 2}}>
        <Text className="text-2xl font-medium mt-5 text-purple-800">Login</Text>
        <CustomInputText
          placeholder="Enter Email"
          width="w-11/12"
          value={email}
          handleChange={val => handleInput(val, 'email')}
        />
        <CustomInputText
          placeholder="Enter Password"
          width="w-11/12"
          value={password}
          textType="password"
          handleChange={val => handleInput(val, 'password')}
        />
        <CustomButton
          title="Login"
          handlePress={() => {
            if (inputValidation()) {
              loginUser(formFields, navigation);
            } else Alert.alert('Please fill the data correctly');
          }}
          width="w-11/12"
          color="bg-purple-800"
        />
        <View className="items-center mt-10 flex-row">
          <Text className="text-black">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign-Up')}>
            <Text className=" text-purple-800 font-bold focus:text-xl">
              {'  '}Create One
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader isVisible={loaderVisible} />
    </View>
  );
};

export default Login;
