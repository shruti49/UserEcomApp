import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ProductCard from '../components/ProductCard';
import {useIsFocused} from '@react-navigation/native';
import SearchCard from '../components/SearchCard';

const Home = () => {
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
          setFilteredProductList(snapshot.docs);
        }
      });
  };

  useEffect(() => {
    getProducts();
  }, [isFocused]);

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
        keyExtractor={item => item._data.id}
        extraData={refreshFlatlist}
      />
    </View>
  );
};

export default Home;
