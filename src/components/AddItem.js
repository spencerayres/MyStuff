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
}) class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardSpace: 0,
    };
  }

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

  commit() {
    const {dispatch, navigator} = this.props;
    dispatch(commitNewItem());
    navigator.pop();
    dispatch(clearPendingNewItem());
  }

  scrollToTextInput() {
    let scrollResponder = this.refs.scroller.getScrollResponder();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      React.findNodeHandle(this.refs.nameInput),
      90, // adjust depending on your contentInset
      /* preventNegativeScrollOffset */ true
    );
  }

  render() {
    return <View style={styles.scene}>
      <ScrollView
        ref='scroller'
        style={styles.scroller}
        keyboardShouldPersistTaps={false}
        onKeyboardWillShow={(e) => {
          this.setState({keyboardSpace: e.endCoordinates.height});
          this.scrollToTextInput();
        }}

        onKeyboardDidHide={(e) => this.setState({keyboardSpace: 0})}
      >
        <View style={styles.innerScroller}>
          <Text style={styles.instructions}>Tap below to add a picture, then name your item.</Text>
          <TouchableOpacity
            onPress={() => this.addImage()}
            style={floatingButton}
          >
            <Image
              style={styles.previewImage}
              source={{uri: this.props.previewImageUri, isStatic: true}}
            />
          </TouchableOpacity>
          <MKTextField
            ref='nameInput'
            style={styles.nameInput}
            defaultValue={this.props.newItemTitle}
            placeholder='Enter name of item'
            onChangeText={(text) => this.props.dispatch(setNewItemTitle(text))}
          />
          <MKButton
              backgroundColor={MKColor.Blue}
              {...floatingButton}
              style={styles.getStartedButton}
              onPress={() => this.commit()}
              >
              <Text pointerEvents='none'
                    style={styles.getStartedButtonText}>
                Done!
              </Text>
            </MKButton>
            <View style={{height: this.state.keyboardSpace}} />
        </View>
      </ScrollView>
    </View>;
  }
}

const styles = addItemStyles;

export default AddItem;
