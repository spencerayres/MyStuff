import React, {AppRegistry, StyleSheet, Text, View, Component, Image, Navigator, PixelRatio, TouchableOpacity} from 'react-native';

const brandColour = '#488282';
const fontFamily = 'System';

module.exports = {
  indexStyles: StyleSheet.create({
    navBar: {
      backgroundColor: brandColour,
      borderBottomWidth: 1 / PixelRatio.get(),
      borderBottomColor: '#CDCDCD',
    },
    navBarText: {
      fontSize: 16,
      marginVertical: 10,
      fontFamily,
    },
    navBarTitleText: {
      color: 'white',
      marginVertical: 9,
      fontFamily,
    },
    navBarLeftButton: {
      paddingLeft: 10,
    },
    navBarRightButton: {
      paddingRight: 10,
    },
    navBarButtonText: {
      color: 'white',
      fontFamily,
    },
  }),
  addItemStyles: StyleSheet.create({
    scene: {
      flex: 1,
      paddingTop: 80,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    previewImage: {
      borderWidth: 1,
      borderColor: '#DDD',
      width: 200,
      height: 200,
      flex: 1,
    },
    nameInput: {
      height: 40,
      margin: 20,
      width: 300,
      flex: 1,
    },
    getStartedButton: {
      margin: 20,
      padding:20,
      flex: 1,
    },
    getStartedButtonText: {
      color: 'white',
      textAlign: 'center',
      fontFamily: fontFamily,
    },
    instructions: {
      margin: 20,
      flex: 1,
      fontFamily: fontFamily,
    },
    scroller: {
      flexDirection: 'column',
    },
    innerScroller: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  }),
  listStyles: StyleSheet.create({
    scene: {
      paddingTop: 60,
      flex: 1,
    },
    getStartedButton: {
      margin: 20,
      padding:20,
    },
    getStartedButtonText: {color: 'white', textAlign: 'center'},
    item: {
      borderBottomWidth: 1,
      borderBottomColor: '#CCC',
      backgroundColor: '#F5FCFF',
      borderTopWidth: 1,
      borderTopColor: '#FFF',
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      fontFamily,
    },
    itemDescription: {
      fontFamily,
    },
    previewImage: {
      height: 64,
      width: 64,
      marginRight: 20,
    },
  }),
  floatingButton: {
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: .7,
    shadowColor: 'black',
  },
};
