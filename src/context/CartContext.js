import {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartLength, setCartLength] = useState(0);
  const [loggedInUserId, setLoggedInUserId] = useState();

  const fetchCartLength = customerId => {
    firestore()
      .collection('cart')
      .where('addedBy', '==', customerId)
      .get()
      .then(snapshot => {
        //if user has added items in cart
        setCartLength(snapshot.docs.length);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    (async () => {
      const customerId = await AsyncStorage.getItem('customerId');
      setLoggedInUserId(customerId);
      fetchCartLength(customerId);
    })();
  }, []);

  //const dispatch = useDispatch();
  const addNewItemInCart = (item, itemId, customerId) => {
    firestore()
      .collection('cart')
      .doc(itemId)
      .set({
        itemId: itemId,
        itemData: {...item._data},
        addedBy: customerId,
        quantity: 1,
      })
      .then(snapshot => {
        fetchCartLength(loggedInUserId);
      })
      .catch(err => console.log(err));
  };

  const removeItemfromCart = id => {
    firestore()
      .collection('cart')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Product deleted!');
        fetchCartLength(loggedInUserId);
      });
  };

  const increaseItemQuantity = item => {
    if (item._data.quantity > 0 && item._data.quantity < 5) {
      firestore()
        .collection('cart')
        .doc(item._data.itemId)
        .update({quantity: item._data.quantity + 1})
        .then(() => {
          fetchCartLength(loggedInUserId);
        })
        .catch(err => console.log(err));
    }
  };

  const decreaseItemQuantity = item => {
    if (item._data.quantity > 1 && item._data.quantity <= 5) {
      firestore()
        .collection('cart')
        .doc(item._data.itemId)
        .update({quantity: item._data.quantity - 1})
        .then(() => {
          console.log(item._data);
          fetchCartLength(loggedInUserId);
        })
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
    <CartContext.Provider
      value={{
        getTotalCartAmount,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemfromCart,
        updatePrice,
        addNewItemInCart,
        cartLength,
      }}>
      {children}
    </CartContext.Provider>
  );
};
