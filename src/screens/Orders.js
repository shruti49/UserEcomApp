import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import OrderCard from '../components/OrderCard';

const Orders = () => {
  const isFocused = useIsFocused();
  const {userData} = useContext(AuthContext);
  const [orderList, setOrderList] = useState([]);

  const fetchOrders = id => {
    firestore()
      .collection('orders')
      .where('userId', '==', id)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          setOrderList(snapshot.docs);
        }
      });
  };

  useEffect(() => {
    fetchOrders(userData.id);
  }, [isFocused]);

  const renderOrderCard = item => <OrderCard item={item} />;

  if (orderList.length === 0) {
    <View>
      <Text>No orders right now</Text>
    </View>;
  }

  return (
    <View className="flex-1 my-4">
      <FlatList
        data={orderList}
        renderItem={({item}) => renderOrderCard(item)}
        keyExtractor={item => item._data.orderId}
      />
    </View>
  );
};

export default Orders;
