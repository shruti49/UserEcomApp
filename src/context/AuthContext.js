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

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem('id');
      const name = await AsyncStorage.getItem('name');
      const email = await AsyncStorage.getItem('email');
      const phoneNo = await AsyncStorage.getItem('phoneNo');
      setUserData({
        id,
        name,
        email,
        phoneNo,
      });
    })();
  }, []);

  const setDataInAsyncStorage = async (data, navigation) => {
    await AsyncStorage.setItem('id', data.customerId);
    await AsyncStorage.setItem('name', data.customerName);
    await AsyncStorage.setItem('email', data.email);
    await AsyncStorage.setItem('phoneNo', data.phoneNo);

    setUserData({
      id: data.id,
      name: data.name,
      email: data.email,
      phoneNo: data.phoneNo,
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
    await AsyncStorage.removeItem('id');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('phoneNo');
    setUserData({
      id: '',
      name: '',
      email: '',
      phoneNo: '',
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
