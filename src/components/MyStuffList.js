/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 *
 */

import React, {Component, Text, ListView, View, Image, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux/native';
import {MKColor, MKButton} from 'react-native-material-kit';
import {listStyles, floatingButton} from '../styles';

@connect(state => {
  return {
    stuffList: state.stuff.get('items').toJS(),
    loading: state.stuff.get('loading'),
  }
})
class MyStuffList extends Component {

  constructor(props:any) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.uuid !== r2.uuid || r1.title !== r2.title || r1.taken !== r2.taken,
    });
    this.state = {
      dataSource: this.ds.cloneWithRows(props.stuffList),
      tmpImage: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    let ds = this.ds;
    let newDataSource = ds.cloneWithRows(nextProps.stuffList);
    this.setState({
      dataSource: newDataSource,
    });
  }

  renderRow(rowData:any) {
    return (
      <TouchableHighlight
        onPress={() => {
          return this.props.navigator.push({name: 'Check in/out', uuid: rowData.uuid, index: 1});
        }}
      >
        <View style={styles.item}>
          {
            rowData.imageUri ? <Image style={styles.previewImage} source={{uri: rowData.imageUri, isStatic: true}}/> : null
          }

          <View>
            <Text style={styles.itemDescription}>{rowData.title}</Text>
            { rowData.taken ? <Text style={styles.itemDescription}>{rowData.takenBy}</Text> : null}
            { rowData.taken ? <Text style={styles.itemDescription}>{rowData.takenSince.fromNow()}</Text> : null}

          </View>

        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.props.loading) {
      return null;
    }

    if (this.props.stuffList.length === 0) {
      return <View style={styles.scene}>
        <MKButton
          backgroundColor={MKColor.Blue}
          {...floatingButton}
          style={styles.getStartedButton}
          onPress={() => this.props.navigator.push({name: 'Add an item', index: 1})}
          >
          <Text pointerEvents='none'
                style={styles.getStartedButtonText}>
            Add your first item
          </Text>
        </MKButton>

      </View>;
    }

    return <View style={styles.scene}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
          return this.renderRow(rowData);
        }}

      />
    </View>;
  }
}

const styles = listStyles;

export default MyStuffList;
