import React from 'react';
import AppNavigation from './routes/routes';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './routes/navigation';
import { Provider } from 'react-redux';

import firebase from './utils/Firebase';
import store from './store';

export default class App extends React.Component {
  componentDidMount() {
    firebase.getCategories();
  };

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <AppNavigation />
        </NavigationContainer>
      </Provider>
    );
  };
}