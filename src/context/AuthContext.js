import {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
  });



  const setDataInAsyncStorage = async (data, navigation) => {
    await AsyncStorage.setItem('customerId', data.customerId);
    await AsyncStorage.setItem('customerName', data.customerName);
    await AsyncStorage.setItem('email', data.email);
    setUserData({
      id: data.customerId,
      name: data.customerName,
      email: data.customerEmail,
    });

    navigation.navigate('Home');
  };

  const loginUser = (formFields, navigation) => {
    const {email, password} = formFields;
    setLoaderVisible(true);
    firestore()
      .collection('customers')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        setLoaderVisible(false);
        if (snapshot.docs.length !== 0) {
          const userObj = snapshot.docs[0]._data;
          if (userObj.password === password) {
            setDataInAsyncStorage(userObj, navigation);
          }
        } else {
          console.log('oops something went wrong');
        }
      })
      .catch(err => {
        setLoaderVisible(false);
        console.log(err);
      });
  };

  const registerUser = (formFields, navigation) => {
    const {displayName, email, phoneNo, password} = formFields;
    setLoaderVisible(true);
    const id = uuid.v4();
    firestore()
      .collection('customers')
      .doc(id)
      .set({
        customerName: displayName,
        email: email,
        phoneNo: phoneNo,
        customerId: id,
        password: password,
      })
      .then(res => {
        setLoaderVisible(false);
        console.log(res);
        navigation.navigate('Login');
      })
      .catch(err => {
        setLoaderVisible(false);
        console.log(err);
      });
  };

  const logout = async navigation => {
    await AsyncStorage.removeItem('customerId');
    await AsyncStorage.removeItem('customerName');
    await AsyncStorage.removeItem('email');
    setUserData({
      id: '',
      name: '',
      email: '',
    });
    navigation.navigate('Home');
  };

  return (
    <AuthContext.Provider
      value={{
        loaderVisible,
        registerUser,
        loginUser,
        logout,
        userData,
        setUserData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
