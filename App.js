/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  StackNavigator,
  TabNavigator,
  NavigationActions,
} from 'react-navigation';

const Login = props => {
  return <Text>login screen</Text>;
};

const One = props => {
  return <Text>tab one</Text>;
};

const Two = props => {
  return <Text>tab two</Text>;
};

const Three = props => {
  return <Text>tab three</Text>;
};

const Home = TabNavigator({
  One: { screen: One },
  Two: { screen: Two },
  Three: { screen: Three },
});

const Stack = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
});

const initNav = Stack.router.getStateForAction(NavigationActions.init());

const reducers = combineReducers({
  nav: (state = initNav, action) => {
    const nextState = Stack.router.getStateForAction(action, state);
    return nextState || state;
  },
});

const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
