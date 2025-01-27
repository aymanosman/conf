/**
 * @flow
 */

import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  StackNavigator,
  TabNavigator,
  NavigationActions,
  addNavigationHelpers,
  TabBarTop,
} from 'react-navigation';
import codePush from 'react-native-code-push';

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>login screen</Text>
    </View>
  );
};

const One = props => {
  return (
    <View style={styles.container}>
      <Text>tab one</Text>
    </View>
  );
};

const Two = props => {
  return (
    <View style={styles.container}>
      <Text>tab two</Text>
    </View>
  );
};

const Three = props => {
  return (
    <View style={styles.container}>
      <Text>tab three</Text>
    </View>
  );
};

setTimeout(() => {
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}, 5000);

const Main = TabNavigator({
  Home: {
    screen: StackNavigator({
      'Home/tabs': {
        screen: TabNavigator(
          {
            'Home/tabs/a': {
              screen: One,
              navigationOptions: {
                title: 'a',
              },
            },
            'Home/tabs/b': {
              screen: One,
              navigationOptions: {
                title: 'b',
              },
            },
            'Home/tabs/c': {
              screen: One,
              navigationOptions: {
                title: 'c',
              },
            },
          },
          {
            tabBarPosition: 'top',
            tabBarComponent: TabBarTop,
          },
        ),
        navigationOptions: {
          title: 'Home',
          header: null,
        },
      },
    }),
  },
  Chat: { screen: Two },
});

const Stack = StackNavigator(
  {
    Login: { screen: Login },
    Main: { screen: Main },
  },
  {
    navigationOptions: {
      header: null,
      gesturesEnabed: false,
    },
  },
);

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

const store = createStore(reducers, applyMiddleware(thunk));

setTimeout(() => {
  store.dispatch(NavigationActions.navigate({ routeName: 'Main' }));
}, 1000);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Nav />
      </Provider>
    );
  }
}

export default codePush(App);

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
