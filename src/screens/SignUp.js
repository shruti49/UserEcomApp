import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import CustomInputText from '../components/CustomInputText';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import {AuthContext} from '../context/AuthContext';

const SignUp = ({navigation}) => {

  const {registerUser, loaderVisible} = useContext(AuthContext);

  const defaultFields = {
    displayName: '',
    email: '',
    phoneNo: '',
    password: '',
    confirmPassword: '',
  };

  const [formFields, setFormFields] = useState(defaultFields);

  const {displayName, email, phoneNo, password, confirmPassword} = formFields;

  const handleFormFields = (inputValue, inputName) => {
    setFormFields({...formFields, [inputName]: inputValue});
  };

  const inputValidation = () => {
    if (
      !displayName ||
      !email ||
      !phoneNo ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword ||
      phoneNo.length < 10
    ) {
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
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        className="w-10 h-10 rounded-lg bg-white absolute top-5 left-5  justify-center items-center"
        style={{elevation: 2}}>
        <Icon name="arrow-back" width={28} height={28} color={'black'} />
      </TouchableOpacity>
      <View
        className="w-[94%] h-full items-center bg-white absolute top-48 rounded-t-[40px]"
        style={{elevation: 2}}>
        <Text className="text-2xl font-medium mt-5 text-purple-700">
          Sign Up
        </Text>
        <KeyboardAvoidingView className="w-11/12" behavior="padding">
          <ScrollView className="pb-56">
            <CustomInputText
              placeholder="Enter Name"
              value={displayName}
              handleChange={val => handleFormFields(val, 'displayName')}
            />
            <CustomInputText
              placeholder="Enter Email"
              value={email}
              handleChange={val => handleFormFields(val, 'email')}
            />
            <CustomInputText
              placeholder="Enter Phone No"
              type="numeric"
              value={phoneNo}
              handleChange={val => handleFormFields(val, 'phoneNo')}
            />
            <CustomInputText
              placeholder="Enter Password"
              value={password}
              textType="password"
              handleChange={val => handleFormFields(val, 'password')}
            />
            <CustomInputText
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              handleChange={val => handleFormFields(val, 'confirmPassword')}
            />
            <CustomButton
              width="w-full"
              title="Sign Up"
              color="bg-purple-800"
              handlePress={() => {
                if (inputValidation()) {
                  registerUser(formFields);
                  navigation.navigate('Login');
                } else {
                  Alert.alert('Please fill the data correctly');
                }
              }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <Loader isVisible={loaderVisible} />
    </View>
  );
};

export default SignUp;
