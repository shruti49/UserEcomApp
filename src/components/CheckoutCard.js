import {useContext} from 'react';
import {View,Text} from 'react-native';
import {CartContext} from '../context/CartContext';

const CheckoutCard = () => {
  const {cartLength} = useContext(CartContext);
  console.log(cartLength);
  return (
    <View
      className="w-11/12 bg-white rounded-md my-4 p-2"
      style={{elevation: 5}}>
      <Text className="font-bold text-lg text-black">Price Details</Text>
      <View className="flex-row justify-between mt-4">
        <Text className="text-black">Bag Quantity</Text>
        <Text className=" text-black">
          {cartLength} {cartLength > 1 ? 'items' : 'item'}
        </Text>
      </View>
      <View className="flex-row justify-between mt-4">
        <Text className="text-black">Bag MRP (1 item)</Text>
        <Text className=" text-black">7050</Text>
      </View>
      <View className="flex-row justify-between mt-4">
        <Text className="text-black">Shipping</Text>
        <Text className="text-black">Free</Text>
      </View>
      <View className="flex-row justify-between mt-4">
        <Text className="font-bold text-xl text-black">You Pay</Text>
        <Text className="font-bold text-xl text-black">7050</Text>
      </View>
    </View>
  );
};

export default CheckoutCard;
