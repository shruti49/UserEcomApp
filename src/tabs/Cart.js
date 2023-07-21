import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const Cart = () => {
  const getCartItems = () => {

  };

  useEffect(() => {
    getCartItems();
    //return () => {};
  }, []);

  return (
    <View>
      <Text>Cart</Text>
    </View>
  );
};

export default Cart;
