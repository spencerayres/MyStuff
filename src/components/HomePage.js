/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */
'use strict';
import React, {AppRegistry, StyleSheet, Text, View, Component, Image} from 'react-native';

class HomePage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('image!logo')} style={styles.image} />
        <Text style={styles.title}>Spencer is Great!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
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
  header: {
    backgroundColor: '#5cafec',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Avenir',
  },
  callToAction: {
    padding: 20,
    margin: 20,
  },
  image: {
    margin: 80,
    height: 200,
    width: 200,
  },
});

export default HomePage;
