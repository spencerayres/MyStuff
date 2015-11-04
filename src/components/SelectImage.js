import React, {Component, Image, View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux/native';
import {UIImagePickerManager} from 'NativeModules';
import {setNewItemImage, setNewItemTitle, commitNewItem, clearPendingNewItem} from '../actionCreators/stuff';
import {MKColor, MKButton, MKTextField} from 'react-native-material-kit';
import {addItemStyles, floatingButton} from '../styles';

@connect(state => {
  return {
    previewImageUri: state.stuff.get('newItemImageUri'),
    newItemTitle: state.stuff.get('newItemTitle'),
  };
})
class SelectImage extends Component {
  addImage() {
    const options = {
      maxWidth: 400,
      maxHeight: 400,
      quality: 0.9,
      allowsEditing: true,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // TODO this might be eating too much space :-/

    UIImagePickerManager.showImagePicker(options, (didCancel, response) => {
      if (!didCancel) if (!response.customButton) {
        // You can display the image using either:
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};

        this.props.dispatch(setNewItemImage(source.uri));
      }
    });
  }

  render() {
    return <TouchableOpacity
      onPress={() => this.addImage()}
      style={floatingButton}
    >
      <Image
        style={styles.previewImage}
        source={{uri: this.props.previewImageUri, isStatic: true}}
      />
    </TouchableOpacity>;
  }
}

const styles = addItemStyles;

export default SelectImage;
