import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ProductCard from '../components/ProductCard';
import {useIsFocused} from '@react-navigation/native';

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const isFocused = useIsFocused();

  const getProducts = () => {
    firestore()
      .collection('products')
      .get()
      .then(snapshot => {
        if (snapshot._docs.length > 0) {
          setProductList(snapshot._docs);
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
    <View className="flex-1 mt-4">
      <FlatList
        data={productList}
        renderItem={({item}) => renderProductCard(item)}
        keyExtractor={item => item._data.id}
        extraData={refreshFlatlist}
      />
    </View>
  );
};

export default Home;
