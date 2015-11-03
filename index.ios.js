/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */
'use strict';
import React, {AppRegistry, Text, Component, Navigator, TouchableOpacity} from 'react-native';
import MyStuffList from './src/components/MyStuffList';
import HomePage from './src/components/HomePage';
import AddItem from './src/components/AddItem';
import EditItem from './src/components/EditItem';
import StorageMonitor from './src/components/StorageMonitor';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux/native';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from './src/reducers/index';
import {indexStyles} from './src/styles';

// EDIT HERE
const initialRouteName = 'Hello World'; // My Stuff!
// DONE EDITING

function prepareStore() {
  const loggerMiddleware = createLogger();

  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )(createStore);

  const reducer = combineReducers(reducers);

  return createStoreWithMiddleware(reducer);
}

const store = prepareStore();

const firstRoute = {
  name: 'Hello!',
  component: MyStuffList,
};

const NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    if (route.name == 'My Stuff!') {
      return <TouchableOpacity
        onPress={() => navigator.push({name: 'Add an item', index: 1})}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Add
        </Text>
      </TouchableOpacity>;
    }

    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.name}
      </Text>
    );
  },

};

class MyStuff extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => {
          const navigator = <Navigator
            initialRoute={{name: initialRouteName, index: 0}}
            renderScene={(route, navigator) => {
              if (route.name == 'My Stuff!') {
                return <MyStuffList navigator={navigator}/>;
              } else if (route.name == 'Add an item') {
                return <AddItem navigator={navigator}/>;
              } else if (route.name == 'Check in/out') {
                return <EditItem navigator={navigator} itemUuid={route.uuid}/>;
              } else if (route.name == 'Hello World') {
                return <HomePage/>;
              }

              return <HomePage/>;
            }}

            navigationBar={
              <Navigator.NavigationBar
                style={styles.navBar}
                routeMapper={NavigationBarRouteMapper}
                />
            }
            configureScene={(route) => {
              return Navigator.SceneConfigs.HorizontalSwipeJump;
            }}

            />;

          // LESSON: Add storage by wrapping this in <StorageMonitor/>

          return (
            navigator
          );
        }}
      </Provider>
    );
  }
}

const styles = indexStyles;

AppRegistry.registerComponent('MyStuff', () => {
  return MyStuff;
});
