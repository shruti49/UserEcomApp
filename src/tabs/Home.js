import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ProductCard from '../components/ProductCard';
import {useIsFocused} from '@react-navigation/native';
import SearchCard from '../components/SearchCard';
import {WishlistContext} from '../context/WishlistContext';
import {AuthContext} from '../context/AuthContext';

const Home = () => {
  const {userData} = useContext(AuthContext);
  const {likedItemsList} = useContext(WishlistContext);
  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const isFocused = useIsFocused();

  const getProducts = () => {
    firestore()
      .collection('products')
      .get()
      .then(snapshot => {
        if (snapshot._docs.length > 0) {
          setProductList(snapshot.docs);
        }
      });
  };

  useEffect(() => {
    getProducts();
    fetchItemsFromWishlist(userData.id);
  }, [isFocused]);

  useEffect(() => {
    const mergedArray = [...likedItemsList, ...productList];

    const set = new Set();
    const filteredArr = mergedArray.filter(item => {
      const productId =
        item._data?.wishlistedItemData?.productId || item._data.productId;
      if (!set.has(productId)) {
        set.add(productId);
        return true;
      }
      return false;
    }, set);
    setFilteredProductList(filteredArr);
  }, [productList, likedItemsList]);

  const renderProductCard = item => (
    <ProductCard
      item={item}
      refreshFlatlist={refreshFlatlist}
      setRefreshFlatList={setRefreshFlatList}
      getProducts={getProducts}
    />
  );

  return (
    <View className="flex-1 mx-auto mt-4 w-11/12">
      <SearchCard
        productList={productList}
        setFilteredProductList={setFilteredProductList}
      />
      <FlatList
        data={filteredProductList}
        renderItem={({item}) => renderProductCard(item)}
        keyExtractor={item => item?._data?.productId || item?._data?.wishlistedItemData?.productId}
        extraData={refreshFlatlist}
      />
    </View>
  );
};

export default Home;
