import React, {useEffect, useState, useContext} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CheckoutCard from '../components/CheckoutCard';
import {CartContext} from '../context/CartContext';

const Cart = () => {
  const {getTotalCartAmount} = useContext(CartContext);
  const navigation = useNavigation();

  const [cartItemList, setCartItemList] = useState([]);
  const [refreshFlatlist, setRefreshFlatList] = useState(false);

  const getCartItems = async () => {
    const customerId = await AsyncStorage.getItem('customerId');
    firestore()
      .collection('cart')
      .where('addedBy', '==', customerId)
      .get()
      .then(snapshot => {
        setCartItemList(snapshot.docs);
      });
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    getCartItems();
  }, [isFocused, refreshFlatlist]);

  const renderProductCard = item => (
    <ProductCard
      item={item}
      screenName="cart"
      refreshFlatlist={refreshFlatlist}
      setRefreshFlatList={setRefreshFlatList}
      getCartItems={getCartItems}
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
          <View className="flex-1 mt-4">
            <FlatList
              data={cartItemList}
              renderItem={({item}) => renderProductCard(item)}
              keyExtractor={item => item._data.itemId}
              extraData={refreshFlatlist}
            />
          </View>
          <CheckoutCard totalAmount={getTotalCartAmount(cartItemList)} />
        </>
      )}
    </>
  );
};

export default Cart;
