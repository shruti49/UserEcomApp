import {createContext, useState} from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
  const [wishlistItems, setWishListItems] = useState([]);

  fetchItemsFromWishlist = customerId => {
    firestore()
      .collection('wishlist')
      .where('userId', '==', customerId)
      .get()
      .then(snapshot => {
        //if user has added items in wishlist
        setWishListItems(snapshot.docs);
      })
      .catch(err => console.log(err));
  };

  const addNewItemInWishlist = (item, itemId, customerId) => {
    firestore()
      .collection('wishlist')
      .doc(itemId)
      .set({
        itemId: itemId,
        itemData: {...item._data},
        userId: customerId,
        quantity: 1,
      })
      .then(snapshot => {
        // fetchItemsFromWishlist(customerId);
      })
      .catch(err => console.log(err));
  };

  const removeItemFromWishlist = id => {
    firestore()
      .collection('wishlist')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Removed wshlsited!');
        //fetchItemsFromWishlist(loggedInUserId);
      });
  };

  return (
    <WishlistContext.Provider
      value={{
        addNewItemInWishlist,
        removeItemFromWishlist,
        setWishListItems,
        wishlistItems,
      }}>
      {children}
    </WishlistContext.Provider>
  );
};
