import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Switch,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import CustomInputText from '../components/CustomInputText';
import CustomButton from '../components/CustomButton';
import {AuthContext} from '../context/AuthContext';
import Loader from '../components/Loader';

import {AddressContext} from '../context/AddressContext';

const AddAddress = ({navigation}) => {
  const {userData} = useContext(AuthContext);
  const {saveAddress, loaderVisible} = useContext(AddressContext);

  const defaultFields = {
    street: '',
    city: '',
    state: '',
    pincode: '',
    contactName: '',
    contactNumber: '',
  };

  const [defaultAddress, setDefaultAddress] = useState(true);
  const toggleSwitch = () => setDefaultAddress(!defaultAddress);

  const [formFields, setFormFields] = useState(defaultFields);
  const {street, city, state, pincode, contactName, contactNumber} = formFields;

  const handleInput = (inputValue, inputName) => {
    setFormFields({...formFields, [inputName]: inputValue});
  };

  const inputValidation = () => {
    if (
      !street ||
      !city ||
      !state ||
      !pincode ||
      !contactName ||
      !contactNumber
    ) {
      return false;
    }

    return true;
  };

  return (
    <View className="flex-1 w-11/12 mx-auto my-4">
      <KeyboardAvoidingView className="flex-1" behavior="">
        <ScrollView className="flex-1">
          <>
            <Text className="text-black font-bold text-xl">Address</Text>
            <CustomInputText
              placeholder="Street"
              value={street}
              handleChange={val => handleInput(val, 'street')}
              multiline={true}
            />
            <CustomInputText
              placeholder="City"
              value={city}
              textType="city"
              handleChange={val => handleInput(val, 'city')}
            />
            <CustomInputText
              placeholder="State"
              value={state}
              handleChange={val => handleInput(val, 'state')}
            />
            <CustomInputText
              placeholder="Pincode"
              value={pincode}
              type="numeric"
              handleChange={val => handleInput(val, 'pincode')}
            />
          </>
          <View className="flex-row mt-8 justify-between">
            <Text className="font-semibold text-base text-black">
              Use as default Address
            </Text>
            <Switch onValueChange={toggleSwitch} value={defaultAddress} />
          </View>
          <View className="mt-4">
            <Text className="text-black font-bold text-xl">Contact</Text>
            <Text className="text-black">
              Information provided here will be used to contact you for delivery
              updates.
            </Text>
            <CustomInputText
              placeholder="Name"
              value={contactName}
              handleChange={val => handleInput(val, 'contactName')}
            />
            <CustomInputText
              placeholder="Phone Number"
              value={contactNumber}
              type="numeric"
              handleChange={val => handleInput(val, 'contactNumber')}
            />
          </View>
        </ScrollView>
        <CustomButton
          title="Ship to this address"
          handlePress={() => {
            if (inputValidation)
              saveAddress(formFields, navigation, userData.id, defaultAddress);
          }}
          width="w-full"
          bgColor="bg-purple-800"
          textColor="text-white"
        />
      </KeyboardAvoidingView>
      <Loader isVisible={loaderVisible} />
    </View>
  );
};

export default AddAddress;
