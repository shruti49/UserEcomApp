import React, {useState, useContext} from 'react';
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

  const {removeItemFromWishlist, addNewItemInWishlist} =
    useContext(WishlistContext);

  const {userData} = useContext(AuthContext);

  const {item, screenName, refreshFlatlist, setRefreshFlatList, getProducts} =
    props;

  let productData;
  if (screenName === 'cart') {
    productData = item._data.itemData;
  } else {
    productData = item._data;
  }

  const {quantity} = item._data;
  const {name, price, description, imageUrl} = productData;

  const [isVisible, setIsVisible] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(true);
  const [actionType, setActionType] = useState();

  const updateFlatList = () => {
    setRefreshFlatList(!refreshFlatlist);
    if (screenName === 'cart') fetchCartItems(userData.id);
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
          .where('userId', '==', customerId)
          .get()
          .then(snapshot => {
            //if user has added items in cart
            if (snapshot.docs.length > 0) {
              //looping over all the items added by the user
              snapshot.docs.map(cartItem => {
                const productId = cartItem._data.itemData.id;
                //if that item exists increase the quantity
                if (productId === item._data.id) {
                  increaseItemQuantity(cartItem);
                } else {
                  //user has not added anything
                  addNewItemInCart(item, itemId, customerId);
                }
              });
            } else {
              //user has not added anything
              addNewItemInCart(item, itemId, customerId);
            }
          });
      } else {
        setIsWishlisted(!isWishlisted);
        if (isWishlisted) {
          addNewItemInWishlist(item, itemId, customerId);
        } else {
          removeItemFromWishlist(itemId);
        }
      }
    } else {
      setIsVisible(true);
    }
  };

  return (
    <View className="mb-4 bg-white rounded-lg p-2" style={{elevation: 5}}>
      <View
        className={
          screenName === 'cart'
            ? 'border-b-2 border-b-slate-200 pb-4 flex-row justify-between'
            : 'flex-row justify-between'
        }>
        <View className="flex-row">
          <Image source={{uri: imageUrl}} className="rounded-sm w-20 h-20" />
          <View className="flex-col ml-4 justify-between">
            <View>
              <Text className="font-semibold text-lg text-black">
                {name}
                {screenName !== 'cart' ? ` - ₹ ${price}` : ''}
              </Text>
              <Text className="text-black">{description}</Text>
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
                  name={isWishlisted ? 'heart-outline' : 'heart'}
                  width={24}
                  height={24}
                  fill={'rgb(107 33 168)'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => checkUserAuthentication(item, 'cart')}
                className="p-2 content-center items-center self-center rounded-lg bg-purple-800">
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
              ₹ {updatePrice(quantity, price)}
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

export default ProductCard;
