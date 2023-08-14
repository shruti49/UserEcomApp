import React, {useEffect, useState, useContext} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import ProductCard from '../components/ProductCard';

import {WishlistContext} from '../context/WishlistContext';
import {AuthContext} from '../context/AuthContext';

const Wishlist = ({navigation}) => {
  const {fetchItemsFromWishlist, likedItemsList, wishlistingItem} =
    useContext(WishlistContext);

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
      screenName="wishlist"
      refreshFlatlist={refreshFlatlist}
      setRefreshFlatList={setRefreshFlatList}
    />
  );
  console.log("Wishlist Page render");
  return (
    <>
      {likedItemsList.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-black text-2xl">Wishlist something</Text>
          <TouchableOpacity
            className="bg-purple-800 rounded-md p-4 mt-4"
            onPress={() => navigation.navigate('Home')}
            style={{elevation: 2}}>
            <Text className="text-white font-semibold text-xl">
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View className="flex-1 mx-auto w-11/12 my-4">
            <FlatList
              data={likedItemsList}
              renderItem={({item}) => renderProductCard(item)}
              keyExtractor={item => item._data.wishlistId}
              extraData={refreshFlatlist}
            />
          </View>
        </>
      )}
    </>
  );
};

export default Wishlist;
