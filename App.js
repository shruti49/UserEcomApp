import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {CartItemProvider} from './src/context/CartItemContext';
import {Provider} from 'react-redux';
import appStore from './src/reduxStore/appStore';

const App = () => {
  return (
    <Provider store={appStore}>
      <CartItemProvider>
        <AppNavigator />
      </CartItemProvider>
    </Provider>
  );
};

export default App;
