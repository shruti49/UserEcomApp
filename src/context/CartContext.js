import {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartLength, setCartLength] = useState(0);
  const [loggedInUserId, setLoggedInUserId] = useState();
  const [cartItemList, setCartItemList] = useState([]);

  const fetchCartItems = customerId => {
    firestore()
      .collection('cart')
      .where('addedByUserId', '==', customerId)
      .get()
      .then(snapshot => {
        //if user has added items in cart
        setCartItemList(snapshot.docs);
        let totalItemLength = 0;
        for (let i = 0; i < snapshot.docs.length; i++) {
          totalItemLength = totalItemLength + snapshot.docs[i]._data.quantity;
        }
        setCartLength(totalItemLength);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    (async () => {
      const customerId = await AsyncStorage.getItem('id');
      setLoggedInUserId(customerId);
    })();
  }, [cartLength]);

  //const dispatch = useDispatch();
  const addNewItemInCart = (item, itemId, customerId) => {
    firestore()
      .collection('cart')
      .doc(itemId)
      .set({
        cartItemId: itemId,
        cartItemData: item?._data?.wishlistId
          ? item?._data?.wishlistedItemData
          : {...item._data},
        addedByUserId: customerId,
        quantity: 1,
      })
      .then(snapshot => {
        fetchCartItems(customerId);
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
        fetchCartItems(loggedInUserId);
      });
  };

  const increaseItemQuantity = item => {
    if (item._data.quantity > 0 && item._data.quantity < 5) {
      firestore()
        .collection('cart')
        .doc(item._data.cartItemId)
        .update({quantity: item._data.quantity + 1})
        .then(() => {
          fetchCartItems(item._data.addedByUserId);
        })
        .catch(err => console.log(err));
    }
  };

  const decreaseItemQuantity = item => {
    if (item._data.quantity > 1 && item._data.quantity <= 5) {
      firestore()
        .collection('cart')
        .doc(item._data.cartItemId)
        .update({quantity: item._data.quantity - 1})
        .then(() => {
          fetchCartItems(item._data.addedByUserId);
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
        totalSum +
        updatePrice(item._data.quantity, item._data.cartItemData.productPrice);
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
        fetchCartItems,
        cartItemList,
      }}>
      {children}
    </CartContext.Provider>
  );
};
