import React, {Component} from 'react-native';
import {connect} from 'react-redux/native';
import {finishedLoadingLocalData, loadingLocalData} from '../actionCreators/stuff';
import simpleStore from 'react-native-simple-store';

@connect(state => {
  return {
    items: state.stuff.get('items'),
  }
})
class StorageMonitor extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(loadingLocalData());
    let stuffListPromise = simpleStore.get('stuffList');
    stuffListPromise.then(
      stuffList => {
        dispatch(finishedLoadingLocalData(stuffList));
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items != this.props.items) {
      // transform values
      const toStore = nextProps.items.map((item) => {
        return {
          uuid: item.uuid,
          title: item.title,
          imageUri: item.imageUri,
          taken: item.taken,
          takenBy: item.takenBy,
          takenSince: item.takenSince ? item.takenSince.format() : null,
        };
      });

      simpleStore.save('stuffList', toStore);
    }
  }

  render() {
    return this.props.children;
  }
}

export default StorageMonitor;
