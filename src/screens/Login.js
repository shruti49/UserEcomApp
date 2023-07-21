import React, {useState} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import CustomInputText from '../components/CustomInputText';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const Login = () => {
  const navigation = useNavigation();

  const defaultFields = {
    email: '',
    password: '',
  };

  const [formFields, setFormFields] = useState(defaultFields);
  const [isVisible, setIsVisible] = useState(false);

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

  const loginUser = () => {
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        setIsVisible(false);
        if (snapshot.docs.length !== 0) {
          const userObj = snapshot.docs[0]._data;
          if (userObj.password === password) {
            goToNextScreen(userObj);
          }
        }
      })
      .catch(err => {
        setIsVisible(false);
        console.log(err);
      });
  };

  const goToNextScreen = async data => {
    await AsyncStorage.setItem('userId', data.userId);
    await AsyncStorage.setItem('name', data.name);
    await AsyncStorage.setItem('email', data.email);
    navigation.navigate('home');
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
            if (inputValidation()) loginUser();
            else Alert.alert('Please fill the data correctly');
          }}
          width="w-11/12"
          color="bg-purple-800"
        />
        <View className="items-center mt-10 flex-row">
          <Text className="text-black">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('sign-up')}>
            <Text className=" text-purple-800 font-bold focus:text-xl">
              {'  '}Create One
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader isVisible={isVisible} />
    </View>
  );
};

export default Login;
