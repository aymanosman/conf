/**
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
  addNavigationHelpers,
} from 'react-navigation';

const Login = props => {
  return <Text>login screen</Text>;
};

const One = props => {
  return <View style={styles.container}><Text>tab one</Text></View>;
};

const Two = props => {
  return <View style={styles.container}><Text>tab two</Text></View>;
};

const Three = props => {
  return <View style={styles.container}><Text>tab three</Text></View>;
};

const Main = TabNavigator({
  One: { screen: One },
  Two: { screen: Two },
  Three: { screen: Three },
});

const Stack = StackNavigator({
  Login: { screen: Login, navigationOptions: { params: { foo: 32 } } },
  Main: {
    screen: Main,
    navigationOptions: {
      header: null,
      gesturesEnabed: false,
    },
  },
});

const Nav = connect(({ nav }) => ({ nav }))(({ dispatch, nav }) => {
  const navigation = addNavigationHelpers({
    dispatch,
    state: nav,
  });
  return <Stack navigation={navigation} />;
});

const initNav = Stack.router.getStateForAction(NavigationActions.init());

const reducers = combineReducers({
  nav: (state = initNav, action) => {
    const nextState = Stack.router.getStateForAction(action, state);
    return nextState || state;
  },
});

export const foo = (() => {
  return 42;
})();

const store = createStore(reducers, applyMiddleware(thunk));

setTimeout(() => {
  store.dispatch(NavigationActions.navigate({ routeName: 'Main' }));
}, 2000);

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Nav />
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

export { Login, Main, Stack, reducers };
