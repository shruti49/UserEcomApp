import React, {useState, useContext, memo} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import AuthenticationModal from '../components/AuthenticationModal';
import {WishlistContext} from '../context/WishlistContext';
import {CartContext} from '../context/CartContext';
import {AuthContext} from '../context/AuthContext';
import uuid from 'react-native-uuid';

const ProductCard = props => {
  const navigation = useNavigation();

  const {
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemfromCart,
    addNewItemInCart,
    fetchCartItems,
    updatePrice,
  } = useContext(CartContext);

  const {
    removeItemFromWishlist,
    addNewItemInWishlist,
    isWishlisted,
    wishlistingItem,
  } = useContext(WishlistContext);

  const {userData} = useContext(AuthContext);

  const {item, screenName, refreshFlatlist, setRefreshFlatList, getProducts} =
    props;

  let productData;
  if (screenName === 'cart') {
    productData = item._data.cartItemData;
  } else if (screenName === 'wishlist') {
    productData = item._data.wishlistedItemData;
  } else {
    productData = item._data;
  }

  const {quantity} = item._data;
  const {productName, productPrice, productDescription, productImageUrl} =
    productData;
  const [isVisible, setIsVisible] = useState(false);
  const [actionType, setActionType] = useState();

  const updateFlatList = () => {
    setRefreshFlatList(!refreshFlatlist);
    if (screenName === 'cart') fetchCartItems(userData.id);
    else if (screenName === 'wishlist') fetchItemsFromWishlist(userData.id);
    else getProducts();
  };

  //check user is logged in or not
  const checkUserAuthentication = (item, type) => {
    setActionType(type);
    const customerId = userData.id;
    //if not logged in got to login page
    if (customerId) {
      const itemId = uuid.v4();
      if (type === 'cart') {
        firestore()
          .collection('cart')
          .where('addedByUserId', '==', customerId)
          .get()
          .then(snapshot => {
            //if user has added items in cart
            if (snapshot.docs.length > 0) {
              //filtering the item with same id
              const filteredArr = snapshot.docs.filter(
                cartItem =>
                  cartItem?._data?.cartItemData?.productId ===
                    item?._data?.productId ||
                  cartItem?._data?.cartItemData?.productId ===
                    item?._data?.wishlistedItemData?.productId,
              );

              if (filteredArr.length > 0) {
                increaseItemQuantity(filteredArr[0]);
              } else {
                addNewItemInCart(item, itemId, customerId);
              }
            } else {
              //user has not added anything
              addNewItemInCart(item, itemId, customerId);
            }
          });
      } else {
        firestore()
          .collection('wishlist')
          .where('wishlistedByUserId', '==', customerId)
          .get()
          .then(snapshot => {
            wishlistingItem(
              item?._data?.productId ||
                item._data?.wishlistedItemData?.productId,
            );
            updateFlatList();
            if (snapshot.docs.length > 0) {
              const filteredArr = snapshot.docs.filter(
                wishlistedItem =>
                  wishlistedItem?._data?.wishlistedItemData?.productId ===
                    item?._data?.productId ||
                  wishlistedItem?._data?.wishlistedItemData?.productId ===
                    item._data?.wishlistedItemData?.productId,
              );

              if (filteredArr.length > 0) {
                removeItemFromWishlist(
                  filteredArr[0]?._data?.wishlistId,
                  customerId,
                  item,
                );
              } else {
                addNewItemInWishlist(item, itemId, customerId);
              }
            } else {
              addNewItemInWishlist(item, itemId, customerId);
            }
          })
          .catch(err => console.log(err));
      }
    } else {
      setIsVisible(true);
    }
  };

  const setIconName = () => {
    if (
      item._data?.isLiked ||
      item._data.wishlistedItemData?.isLiked ||
      isWishlisted.includes(
        item?._data?.productId || item?._data?.wishlistedItemData?.productId,
      )
    )
      return 'heart';
    else return 'heart-outline';
  };

  return (
    <View className="mb-4 bg-white rounded-lg p-2" style={{elevation: 3}}>
      <View
        className={
          screenName === 'cart'
            ? 'border-b-2 border-b-slate-200 pb-4 flex-row justify-between'
            : 'flex-row justify-between'
        }>
        <View className="flex-row">
          <Image
            source={{uri: productImageUrl}}
            className="rounded-sm w-20 h-20"
          />
          <View className="flex-col ml-4 justify-between">
            <View>
              <Text className="font-semibold text-lg text-black">
                {productName}
                {screenName !== 'cart' ? ` - ₹ ${productPrice}` : ''}
              </Text>
              <Text className="text-black">{productDescription}</Text>
            </View>
          </View>
        </View>
        <View className="justify-between items-end">
          {screenName === 'cart' ? (
            <TouchableOpacity
              onPress={() => {
                removeItemfromCart(item._data.itemId);
                updateFlatList();
              }}>
              <Icon
                name="trash-2-outline"
                width={24}
                height={24}
                fill={'rgb(107 33 168)'}
              />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => checkUserAuthentication(item, 'wishlist')}>
                <Icon
                  name={userData.id ? setIconName() : 'heart-outline'}
                  width={24}
                  height={24}
                  fill="#CE2029"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => checkUserAuthentication(item, 'cart')}
                className="p-2 rounded-lg bg-purple-800">
                <Text className="text-white">Add to Cart</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      {screenName === 'cart' && (
        <View className="mt-4 flex-row justify-between items-center">
          <View className="flex-row">
            <TouchableOpacity
              className="border py-1 px-2 rounded-md"
              onPress={() => {
                decreaseItemQuantity(item);
                updateFlatList();
              }}
              disabled={quantity === 1 ? true : false}>
              <Text className="text-black font-bold text-xl">-</Text>
            </TouchableOpacity>
            <View className="border py-1 px-2 rounded-md">
              <Text className="text-black font-bold text-xl">{quantity}</Text>
            </View>
            <TouchableOpacity
              className="border py-1 px-2 rounded-md"
              onPress={() => {
                increaseItemQuantity(item);
                updateFlatList();
              }}
              disabled={quantity === 5 ? true : false}>
              <Text className="text-black font-bold text-xl">+</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-black font-bold text-xl">
              ₹ {updatePrice(quantity, productPrice)}
            </Text>
          </View>
        </View>
      )}

      <AuthenticationModal
        isVisible={isVisible}
        type={actionType}
        onCancel={() => setIsVisible(false)}
        onHandleLogin={() => {
          setIsVisible(false);
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

export default memo(ProductCard);
