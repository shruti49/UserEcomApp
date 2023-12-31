import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {CartProvider} from './src/context/CartContext';
import {AuthProvider} from './src/context/AuthContext';
import {AddressProvider} from './src/context/AddressContext';
import {WishlistProvider} from './src/context/WishlistContext';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AddressProvider>
          <WishlistProvider>
            <AppNavigator />
          </WishlistProvider>
        </AddressProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
