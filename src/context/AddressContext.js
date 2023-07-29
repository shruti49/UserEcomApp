import {createContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {useEffect} from 'react';

export const AddressContext = createContext();

export const AddressProvider = ({children}) => {
  const [addressList, setAddressList] = useState([]);
  const [address, setAddress] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
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

  const getAddressById = addressId => {
    firestore()
      .collection('address')
      .where('id', '==', addressId)
      .get()
      .then(snapshot => setAddress(snapshot.docs))
      .catch(err => console.log(err));
  };

  const addNewAddress = (
    formFields,
    navigation,
    customerId,
    defaultAddress,
    setFormFields,
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
        setFormFields({
          street: '',
          city: '',
          state: '',
          pincode: '',
          contactName: '',
          contactNumber: '',
        });
        navigation.goBack();
      })
      .catch(err => {
        setLoaderVisible(false);
        console.log(err);
      });
  };

  const editAddress = (
    formFields,
    navigation,
    addressId,
    defaultAddress,
    setFormFields,
  ) => {
    setLoaderVisible(true);
    const {street, city, state, pincode, contactName, contactNumber} =
      formFields;
    firestore()
      .collection('address')
      .doc(addressId)
      .update({
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
        setFormFields({
          street: '',
          city: '',
          state: '',
          pincode: '',
          contactName: '',
          contactNumber: '',
        });
        navigation.goBack();
      })
      .catch(err => {
        setLoaderVisible(false);
        console.log(err);
      });
  };

  const saveAddress = (
    formFields,
    navigation,
    customerId,
    defaultAddress,
    screenType,
    addressId,
    setFormFields,
  ) => {
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
          if (screenType === 'edit') {
            editAddress(
              formFields,
              navigation,
              addressId,
              defaultAddress,
              setFormFields,
            );
          } else {
            addNewAddress(
              formFields,
              navigation,
              customerId,
              defaultAddress,
              setFormFields,
            );
          }
        })
        .catch(err => console.log(err));
    } else {
      if (screenType === 'edit') {
        editAddress(
          formFields,
          navigation,
          addressId,
          defaultAddress,
          setFormFields,
        );
      } else {
        addNewAddress(
          formFields,
          navigation,
          customerId,
          defaultAddress,
          setFormFields,
        );
      }
    }
  };

  const handleSelectedAddress = item => {
    setSelectedAddress(item);
  };

  const clearFormFields = () => {
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
    <AddressContext.Provider
      value={{
        addressList,
        getAddress,
        handleSelectedAddress,
        selectedAddress,
        saveAddress,
        loaderVisible,
        editAddress,
        getAddressById,
        address,
      }}>
      {children}
    </AddressContext.Provider>
  );
};
