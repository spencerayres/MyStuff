import React, {Component, Image, View, Text, AlertIOS, ScrollView} from 'react-native';
import {connect} from 'react-redux/native';
import {removeItem, checkOutItem, checkInItem} from '../actionCreators/stuff';
import {MKColor, MKButton} from 'react-native-material-kit';
import {addItemStyles, floatingButton} from '../styles';

@connect(state => {
  return {
    items: state.stuff.get('items'),
  }
})
class EditItem extends Component {
  deleteItem() {
    this.props.dispatch(removeItem(this.props.itemUuid));
    this.props.navigator.pop();
  }

  takeItem() {
    AlertIOS.prompt(
      'Who\'s taking this?',
      [
        {text: 'Cancel', onPress: () => null},
        {
          text: 'Done',
          onPress: (name) => {
            const {itemUuid} = this.props;
            this.props.dispatch(checkOutItem(itemUuid, name));
            this.props.navigator.pop();
          },
        },
      ]
    );
  }

  returnItem() {
    const {itemUuid} = this.props;
    this.props.dispatch(checkInItem(itemUuid));
    this.props.navigator.pop();
  }

  render() {
    const {itemUuid} = this.props;
    const thisItem = this.props.items.find(item => item.uuid == itemUuid);
    if (!thisItem) {
      return null;
    }

    return <View style={styles.scene}>
      <ScrollView
        ref='scroller'
        style={styles.scroller}
        keyboardShouldPersistTaps={false}
      >
        <View style={styles.innerScroller}>

      <View
        style={floatingButton}
      >
        <Image
          style={styles.previewImage}
          source={{uri: thisItem.imageUri, isStatic: true}}
        />
      </View>
      <Text style={styles.instructions}>{thisItem.title}</Text>
      { !thisItem.taken ? <MKButton
          backgroundColor={MKColor.Blue}
          {...floatingButton}
          style={styles.getStartedButton}
          onPress={() => this.takeItem()}
          >
          <Text pointerEvents='none'
                style={styles.getStartedButtonText}>
            Check out
          </Text>
        </MKButton> : null}
      { thisItem.taken ? <MKButton
          backgroundColor={MKColor.Green}
          {...floatingButton}
          style={styles.getStartedButton}
          onPress={() => this.returnItem()}
          >
          <Text pointerEvents='none'
                style={styles.getStartedButtonText}>
            Check in
          </Text>
        </MKButton> : null}
      <MKButton
          backgroundColor={MKColor.Red}
          {...floatingButton}
          style={styles.getStartedButton}
          onPress={() => this.deleteItem()}
          >
          <Text pointerEvents='none'
                style={styles.getStartedButtonText}>
            Delete item
          </Text>
        </MKButton>
    </View></ScrollView></View>;
  }
}

const styles = addItemStyles;

export default EditItem;
