import {createContext} from 'react';
import firestore from '@react-native-firebase/firestore';

export const CartItemContext = createContext();

export const CartItemProvider = ({children}) => {
  const addNewItemInCart = (item, itemId, userId) => {
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
  };

  const removeItemfromCart = id => {
    firestore()
      .collection('cart')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Product deleted!');
      });
  };

  const increaseItemQuantity = item => {
    if (item._data.quantity > 0 && item._data.quantity < 5) {
      firestore()
        .collection('cart')
        .doc(item._data.itemId)
        .update({quantity: item._data.quantity + 1})
        .then(() => {})
        .catch(err => console.log(err));
    }
  };

  const decreaseItemQuantity = item => {
    if (item._data.quantity > 1 && item._data.quantity <= 5) {
      firestore()
        .collection('cart')
        .doc(item._data.itemId)
        .update({quantity: item._data.quantity - 1})
        .then(() => {})
        .catch(err => console.log(err));
    }
  };

  const updatePrice = (quantity, initalPrice) => {
    let totalPrice = 0;
    for (let i = 0; i < quantity; i++) {
      totalPrice = totalPrice + parseInt(initalPrice);
    }
    return totalPrice;
  };

  const getTotalCartAmount = itemList => {
    let totalSum = 0;
    itemList.map(item => {
      totalSum =
        totalSum + updatePrice(item._data.quantity, item._data.itemData.price);
    });
    return totalSum;
  };

  return (
    <CartItemContext.Provider
      value={{
        getTotalCartAmount,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemfromCart,
        updatePrice,
        addNewItemInCart
      }}>
      {children}
    </CartItemContext.Provider>
  );
};
