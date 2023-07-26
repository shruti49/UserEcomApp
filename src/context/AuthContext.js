import {createContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [loaderVisible, setLoaderVisible] = useState(false);

  const setDataInAsyncStorage = async data => {
    await AsyncStorage.setItem('customerId', data.customerId);
    await AsyncStorage.setItem('customerName', data.customerName);
    await AsyncStorage.setItem('email', data.email);
  };

  const loginUser = formFields => {
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
            setDataInAsyncStorage(userObj);
          }
        }
      })
      .catch(err => {
        setLoaderVisible(false);
        console.log(err);
      });
  };

  const registerUser = formFields => {
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
      })
      .catch(err => {
        setLoaderVisible(false);
        console.log(err);
      });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('customerId');
    await AsyncStorage.removeItem('customerName');
    await AsyncStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider
      value={{
        loaderVisible,
        registerUser,
        loginUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
