import {createContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

export const AddressContext = createContext();

export const AddressProvider = ({children}) => {
  const [addressList, setAddressList] = useState();
  const [defaultAddressId, setDefaultAddressId] = useState();
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddressId);
  const [loaderVisible, setLoaderVisible] = useState(false);

  const getAddress = id => {
    firestore()
      .collection('address')
      .where('customerId', '==', id)
      .get()
      .then(snapshot => {
        setAddressList(snapshot.docs);
      })
      .catch(err => console.log(err));
  };

  const addNewAddress = (
    formFields,
    navigation,
    customerId,
    defaultAddress,
  ) => {
    const {street, city, state, pincode, contactName, contactNumber} =
      formFields;
    const addressId = uuid.v4();
    firestore()
      .collection('address')
      .doc(addressId)
      .set({
        id: addressId,
        customerId: customerId,
        street,
        city,
        state,
        pincode,
        contactName,
        contactNumber,
        defaultAddress,
      })
      .then(snapshot => {
        setLoaderVisible(false);
        setDefaultAddressId(addressId);
        navigation.goBack();
      })
      .catch(err => {
        setLoaderVisible(false);
        console.log(err);
      });
  };

  const saveAddress = (formFields, navigation, customerId, defaultAddress) => {
    setLoaderVisible(true);
    if (defaultAddress) {
      //check whether user has added any address or not
      firestore()
        .collection('address')
        .where('customerId', '==', customerId)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length > 0) {
            //looping over all the address added by the user
            snapshot.docs.map(address => {
              //make defaultaddress as false
              firestore().collection('address').doc(address._data.id).update({
                defaultAddress: false,
              });
            });
          }
          addNewAddress(formFields, navigation, customerId, defaultAddress);
        })
        .catch(err => console.log(err));
    } else {
      addNewAddress(formFields, navigation, customerId, defaultAddress);
    }
  };

  const handleSelectedAddress = item => {
    setSelectedAddressId(item.id);
  };

  return (
    <AddressContext.Provider
      value={{
        addressList,
        getAddress,
        handleSelectedAddress,
        selectedAddressId,
        saveAddress,
        loaderVisible,
      }}>
      {children}
    </AddressContext.Provider>
  );
};
