import React, {useEffect, useState, useContext} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import ProductCard from '../components/ProductCard';
import TotalPriceCard from '../components/TotalPriceCard';

import {WishlistContext} from '../context/WishlistContext';
import {AuthContext} from '../context/AuthContext';

const Wishlist = ({navigation}) => {
  const {fetchItemsFromWishlist, wishlistItems} = useContext(WishlistContext);

  const {userData} = useContext(AuthContext);

  const [refreshFlatlist, setRefreshFlatList] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const customerId = userData.id;
    if (customerId !== '') {
      fetchItemsFromWishlist(customerId);
    }
  }, [isFocused]);

  const renderProductCard = item => (
    <ProductCard
      item={item}
      //screenName="cart"
      refreshFlatlist={refreshFlatlist}
      setRefreshFlatList={setRefreshFlatList}
    />
  );

  return (
    <>
      {wishlistItems.length === 0 ? (
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
              data={wishlistItems}
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

export default Wishlist;
