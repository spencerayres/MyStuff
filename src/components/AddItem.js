import React, {Component, Image, View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux/native';
import {UIImagePickerManager} from 'NativeModules';
import {setNewItemImage, setNewItemTitle, commitNewItem, clearPendingNewItem} from '../actionCreators/stuff';
import {MKColor, MKButton, MKTextField} from 'react-native-material-kit';
import {addItemStyles, floatingButton} from '../styles';
import SelectImage from './SelectImage';

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
    // LESSON Change instruction text and include SelectImage below it.
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

          <Text style={styles.instructions}>Name your item and add a picture.</Text>
          <SelectImage />
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
