import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import AuthenticationModal from '../components/AuthenticationModal';
import uuid from 'react-native-uuid';

const ProductCard = props => {
  const navigation = useNavigation();

  const {name, price, description, imageUrl} = props.item._data;

  const [isVisible, setIsVisible] = useState(false);
  // const handleRemove = itemId => {
  //   firestore()
  //     .collection('products')
  //     .doc(itemId)
  //     .delete()
  //     .then(() => {
  //       console.log('Product deleted!');
  //       props.setRefreshFlatList(!props.refreshFlatlist);
  //       props.getProducts();
  //     });
  // };

  const checkAuth = async item => {
    const userId = await AsyncStorage.getItem('userId');
    const itemId = uuid.v4();
    if (userId !== null) {
      firestore()
        .collection('cart')
        .where('addedBy', '==', userId)
        .get()
        .then(snapshot => {
          //if user has added items in cart
          if (snapshot.docs.length > 0) {
            //looping over all the items added by the user
            snapshot.docs.map(cartItem => {
              const productId = cartItem._data.itemData.id;
              //if that item exists increase the quantity
              if (productId === item._data.id) {
                firestore()
                  .collection('cart')
                  .doc(cartItem._data.itemId)
                  .update({quantity: cartItem._data.quantity + 1})
                  .then(snapshot => {
                    console.log(snapshot);
                  })
                  .catch(err => console.log(err));
              } else {
                firestore()
                  .collection('cart')
                  .doc(itemId)
                  .set({
                    itemId: itemId,
                    itemData: {...item._data},
                    addedBy: userId,
                    quantity: 1,
                  })
                  .then(snapshot => {})
                  .catch(err => console.log(err));
              }
            });
          } else {
            //user has not added anything
            firestore()
              .collection('cart')
              .doc(itemId)
              .set({
                itemId: itemId,
                itemData: {...item._data},
                addedBy: userId,
                quantity: 1,
              })
              .then(snapshot => {})
              .catch(err => console.log(err));
          }
        });
    } else setIsVisible(true);
  };

  return (
    <View
      className="w-11/12 mx-auto h-24 flex-row justify-between bg-white mt-4 rounded-lg p-2"
      style={{elevation: 2}}>
      <View className="flex-row">
        <Image source={{uri: imageUrl}} className="rounded-sm w-20 h-20" />
        <View className="flex-col ml-4 justify-between">
          <View>
            <Text className="font-semibold text-lg text-black">
              {name} - ₹ {price}
            </Text>
            <Text className="text-black">{description}</Text>
          </View>
        </View>
      </View>
      <View className="justify-between items-end">
        <TouchableOpacity onPress={() => checkAuth(props.item)}>
          <Icon name="heart-outline" width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => checkAuth(props.item)}
          className="p-2 content-center items-center self-center border rounded-lg">
          <Text className="text-black">Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <AuthenticationModal
        isVisible={isVisible}
        onCancel={() => setIsVisible(false)}
        onHandleLogin={() => {
          setIsVisible(false);
          navigation.navigate('login');
        }}
      />
    </View>
  );
};

export default ProductCard;
