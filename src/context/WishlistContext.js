import {createContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
  const [likedItemsList, setLikedItemsList] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState([]);
  const [wishlistLength, setWishlistLength] = useState();

  const wishlistingItem = id => {
    if (isWishlisted.includes(id)) {
      let notWishlisted = isWishlisted.filter(elem => elem !== id);
      setIsWishlisted(notWishlisted);
    } else {
      setIsWishlisted(isWishlisted => [...isWishlisted, id]);
    }
  };

  fetchItemsFromWishlist = customerId => {
    firestore()
      .collection('wishlist')
      .where('wishlistedByUserId', '==', customerId)
      .get()
      .then(snapshot => {
        setLikedItemsList(snapshot.docs);
        setWishlistLength(snapshot.docs.length);
      })
      .catch(err => console.log(err));
  };

  const addNewItemInWishlist = (item, itemId, customerId) => {
    firestore()
      .collection('wishlist')
      .doc(itemId)
      .set({
        wishlistId: itemId,
        wishlistedItemData: {...item._data, isLiked: true},
        wishlistedByUserId: customerId,
      })
      .then(snapshot => {
        firestore()
          .collection('products')
          .doc(item._data.productId)
          .update({
            isLiked: true,
          })
          .then(snapshot => {});
        fetchItemsFromWishlist(customerId);
      })
      .catch(err => console.log(err));
  };

  const removeItemFromWishlist = (itemId, customerId, item) => {
    firestore()
      .collection('wishlist')
      .doc(itemId)
      .delete()
      .then(() => {
        firestore()
          .collection('products')
          .doc(
            item?._data?.productId ||
              item?._data?.wishlistedItemData?.productId,
          )
          .update({
            isLiked: false,
          })
          .then(snapshot => {});
        console.log('Removed wishlisted Item!');
        fetchItemsFromWishlist(customerId);
      });
  };

  return (
    <WishlistContext.Provider
      value={{
        addNewItemInWishlist,
        removeItemFromWishlist,
        fetchItemsFromWishlist,
        setLikedItemsList,
        likedItemsList,
        isWishlisted,
        wishlistingItem,
        wishlistLength
      }}>
      {children}
    </WishlistContext.Provider>
  );
};
