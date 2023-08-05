import {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddressContext = createContext();

export const AddressProvider = ({children}) => {
  const [addressList, setAddressList] = useState([]);
  const [address, setAddress] = useState();
  const [shippingAddress, setShippingAddress] = useState();
  const [loaderVisible, setLoaderVisible] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('address');
        if (value !== null) {
          // We have data!!
          setShippingAddress(JSON.parse(value));
        }
      } catch (error) {
        // Error retrieving data
      }
    })();
  }, []);

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
    isDefault,
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
        isDefault,
      })
      .then(res => {
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
    isDefault,
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
        isDefault,
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
    isDefault,
    screenType,
    addressId,
    setFormFields,
  ) => {
    setLoaderVisible(true);

    //check whether user has added any address or not
    firestore()
      .collection('address')
      .where('customerId', '==', customerId)
      .get()
      .then(snapshot => {
        //If there are no addresses
        //Case - isDefault(true)
        //then simply save address

        //Case - isDefault(false)
        //set isDefault true

        if (!isDefault && snapshot.docs.length === 0) {
          isDefault = true;
        }

        //If there are addresses
        if (snapshot.docs.length > 0) {
          //Case - isDefault(true)
          if (isDefault) {
            //looping over all the address added by the user
            snapshot.docs.map(address => {
              //make isDefault false for every other address in list
              firestore().collection('address').doc(address._data.id).update({
                isDefault: false,
              });
            });
          }
          //Case - isDefault(false)
          else {
            //find the address with isDefault true
            //if no defaultAddress is found then make
            //the first one as default
            const add = snapshot.docs.filter(
              add => add._data.isDefault === true,
            );

            if (add.length === 0) {
              firestore()
                .collection('address')
                .doc(snapshot.docs[0]._data.id)
                .update({
                  isDefault: true,
                });
            }
          }
        }

        if (screenType === 'edit') {
          editAddress(
            formFields,
            navigation,
            addressId,
            isDefault,
            setFormFields,
          );
        } else {
          addNewAddress(
            formFields,
            navigation,
            customerId,
            isDefault,
            setFormFields,
          );
        }
      })
      .catch(err => console.log(err));
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

  const handleSelectedAddress = async (selectedAddress, navigation) => {
    setLoaderVisible(true);
    await AsyncStorage.setItem(
      'address',
      JSON.stringify(selectedAddress),
      err => {
        if (err) {
          console.log('an error');
          throw err;
        }
        console.log('success');
      },
    ).catch(err => {
      console.log('error is: ' + err);
    });
    try {
      const value = await AsyncStorage.getItem('address');
      if (value !== null) {
        // We have data!!
        //console.log(JSON.parse(value));
        setShippingAddress(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
    setLoaderVisible(false);
    navigation.navigate('Checkout');
  };

  return (
    <AddressContext.Provider
      value={{
        addressList,
        getAddress,
        setShippingAddress,
        shippingAddress,
        saveAddress,
        loaderVisible,
        editAddress,
        getAddressById,
        address,
        handleSelectedAddress,
      }}>
      {children}
    </AddressContext.Provider>
  );
};
