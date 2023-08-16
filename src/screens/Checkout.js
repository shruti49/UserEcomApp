import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';
import {CartContext} from '../context/CartContext';
import {AuthContext} from '../context/AuthContext';
import CheckoutCard from '../components/CheckoutCard';
import ShippingCard from '../components/ShippingCard';

const Checkout = ({navigation}) => {
  const {getTotalCartAmount, cartItemList} = useContext(CartContext);
  const {userData} = useContext(AuthContext);

  const orderPlaced = paymentId => {
    const cartList = [];
    cartItemList.map(item => {
      cartList.push(item._data);
      firestore().collection('cart').doc(item._data.cartItemId).delete();
    });
    const orderId = uuid.v4();
    firestore().collection('orders').doc(orderId).set({
      cartItems: cartList,
      orderId,
      paymentId,
      status: 'Placed',
      userId: userData.id,
    });
    navigation.navigate('Success');
  };

  const handlePaymentGateway = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_ozHVG6fkAS3NCK',
      amount: getTotalCartAmount(cartItemList) * 100,
      name: 'foo',
      prefill: {
        email: userData.email,
        contact: userData.phoneNo,
        name: userData.name,
      },
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
        orderPlaced(data.razorpay_payment_id);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View className="flex-1 items-center my-4">
      <CheckoutCard />
      <ShippingCard navigation={navigation} />
      <View className="flex-1 w-full justify-end">
        <CustomButton
          title="Pay Now"
          style="w-11/12 bg-purple-800"
          textColor="text-white"
          handlePress={handlePaymentGateway}
        />
      </View>
    </View>
  );
};

export default Checkout;
