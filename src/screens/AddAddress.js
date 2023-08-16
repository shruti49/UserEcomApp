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
import {useEffect} from 'react';

const AddAddress = ({navigation, route}) => {
  let addressId;
  let screenType;
  if (route.params !== undefined) {
    if (route.params.addressId !== undefined) {
      addressId = route.params.addressId;
    }
    if (route.params.screenType !== undefined) {
      screenType = route.params.screenType;
    }
  }

  const {userData} = useContext(AuthContext);
  const {saveAddress, loaderVisible, getAddressById, address} =
    useContext(AddressContext);

  const defaultFields = {
    street: '',
    city: '',
    state: '',
    pincode: '',
    contactName: userData.name,
    contactNumber: userData.phoneNo,
  };

  const [isDefault, setIsDefault] = useState(false);
  const toggleSwitch = () => setIsDefault(!isDefault);

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

  useEffect(() => {
    if (addressId !== undefined) {
      getAddressById(addressId);
    }
  }, []);

  useEffect(() => {
    if (address !== undefined && addressId !== undefined) {
      const {
        street,
        city,
        state,
        pincode,
        contactName,
        contactNumber,
        isDefault,
      } = address[0]._data;
      setFormFields({
        street,
        city,
        state,
        pincode,
        contactName,
        contactNumber,
      });
      setIsDefault(isDefault);
    } else {
      setFormFields(defaultFields);
    }
  }, [address, addressId]);

  const clearInputFields = () => {
    setFormFields({
      street: '',
      city: '',
      state: '',
      pincode: '',
      contactName: '',
      contactNumber: '',
    });
  };

  return (
    <View className="flex-1 w-11/12 mx-auto my-4">
      <KeyboardAvoidingView className="flex-1" behavior="">
        <ScrollView className="flex-1">
          <>
            <Text className="text-black font-bold text-xl mb-4">Address</Text>
            <CustomInputText
              placeholder="Street"
              value={street}
              handleChange={val => handleInput(val, 'street')}
              multiline={true}
              style="mb-4"
            />
            <CustomInputText
              placeholder="City"
              value={city}
              textType="city"
              handleChange={val => handleInput(val, 'city')}
              style="mb-4"
            />
            <CustomInputText
              placeholder="State"
              value={state}
              handleChange={val => handleInput(val, 'state')}
              style="mb-4"
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
            <Switch onValueChange={toggleSwitch} value={isDefault} />
          </View>
          <View className="mt-4">
            <Text className="text-black font-bold text-xl">Contact</Text>
            <Text className="text-black mt-2 mb-4">
              Information provided here will be used to contact you for delivery
              updates.
            </Text>
            <CustomInputText
              placeholder="Name"
              value={contactName}
              handleChange={val => handleInput(val, 'contactName')}
              style="mb-4"
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
              saveAddress(
                formFields,
                navigation,
                userData.id,
                isDefault,
                screenType,
                addressId,
                setFormFields,
              );
          }}
          style="w-full bg-purple-800"
          textColor="text-white"
        />
      </KeyboardAvoidingView>
      <Loader isVisible={loaderVisible} />
    </View>
  );
};

export default AddAddress;
