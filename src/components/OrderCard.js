import React from 'react';
import {View, Text, Image} from 'react-native';

const OrderCard = ({item}) => {
  const {status, cartItems, orderId} = item._data;

  return (
    <>
      <View>
        <Text className="text-black text-center mb-4 font-bold">
          ORDER ID : {orderId}
        </Text>
      </View>
      {cartItems.map(cartItem => (
        <View
          className="w-11/12 mx-auto mb-4 bg-white rounded-lg p-2"
          style={{elevation: 5}}
          key={cartItem.itemId}>
          <View className="flex-row justify-between">
            <View className="flex-row">
              <Image
                source={{uri: cartItem.itemData.productImageUrl}}
                className="rounded-sm w-20 h-20"
              />
              <View className="flex-col ml-4 justify-between">
                <View>
                  <Text className="font-semibold text-lg text-black">
                    {cartItem.itemData.productName}
                  </Text>
                  <Text className="text-black">
                    {cartItem.itemData.productDescription}
                  </Text>
                </View>
              </View>
            </View>
            <Text className="self-end text-green-700 text-bold text-lg">
              Order {status}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
};

export default OrderCard;
