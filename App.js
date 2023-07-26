import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {CartItemProvider} from './src/context/CartItemContext';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <CartItemProvider>
        <AppNavigator />
      </CartItemProvider>
    </AuthProvider>
  );
};

export default App;
