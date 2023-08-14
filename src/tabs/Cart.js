import React, {useEffect, useState, useContext} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import ProductCard from '../components/ProductCard';
import TotalPriceCard from '../components/TotalPriceCard';

import {CartContext} from '../context/CartContext';
import {AuthContext} from '../context/AuthContext';

const Cart = ({navigation}) => {
  const {fetchCartItems, cartItemList} = useContext(CartContext);

  const {userData} = useContext(AuthContext);

  const [refreshFlatlist, setRefreshFlatList] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const customerId = userData.id;
    if (customerId !== '') {
      fetchCartItems(customerId);
    }
  }, [isFocused]);

  const renderProductCard = item => (
    <ProductCard
      item={item}
      screenName="cart"
      refreshFlatlist={refreshFlatlist}
      setRefreshFlatList={setRefreshFlatList}
    />
  );


  return (
    <>
      {cartItemList.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-black text-2xl">Your bag is empty!</Text>
          <Text className="text-black text-sm m-2">
            This feels too light! Go on,add all of your favorites.
          </Text>
          <TouchableOpacity
            className="bg-purple-800 rounded-md p-4"
            onPress={() => navigation.navigate('Home')}
            style={{elevation: 2}}>
            <Text className="text-white font-semibold text-xl">
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View className="flex-1 m-4">
            <FlatList
              data={cartItemList}
              renderItem={({item}) => renderProductCard(item)}
              keyExtractor={item => item._data.itemId}
              extraData={refreshFlatlist}
            />
          </View>
          <TotalPriceCard navigation={navigation} />
        </>
      )}
    </>
  );
};

export default Cart;
