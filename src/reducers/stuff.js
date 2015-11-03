import {
  LOADING_LOCAL_DATA,
  FINISHED_LOADING_LOCAL_DATA,
  ADD_ITEM,
  SET_NEW_ITEM_IMAGE,
  SET_NEW_ITEM_TITLE,
  COMMIT_NEW_ITEM,
  CLEAR_PENDING_NEW_ITEM,
  REMOVE_ITEM,
  CHECK_OUT_ITEM,
  CHECK_IN_ITEM,
} from '../actionCreators/stuff';
import {Map, List} from 'immutable';
import uuid from 'node-uuid';
import moment from 'moment';

var uuid4 = uuid.v4();

const defaultStuffState = Map({
  items: List(),
  loading: false,
  newItemTitle: '',
  newItemImageUri: null,
  newItemUuid: uuid4,
});

const fakeInitialItem = {
  title: 'Office Key',
  imageUri: 'image!logo',
  taken: true,
  takenBy: 'Shaun Stanworth',
  takenSince: moment('2015-10-08 09:30:26.123'),
};

export default function stuff(state=defaultStuffState, action) {
  switch (action.type) {
    case LOADING_LOCAL_DATA:
      return state.merge({
        loading: true,
      });
    case FINISHED_LOADING_LOCAL_DATA:
      let items;
      if (action.stuffList === null) {
        items = [];
        items = [];
      } else {
        // transform
        items = action.stuffList.map((item) => {
          return {
            takenSince: item.takenSince ? moment(item.takenSince) : null,
            title: item.title,
            uuid: item.uuid,
            imageUri: item.imageUri,
            taken: item.taken,
            takenBy: item.takenBy,

          };
        });
      }

      let newState = state.merge({
        loading: false,
        items: List(items),
      });
      return newState;
    case SET_NEW_ITEM_TITLE:
      return state.merge({
        newItemTitle: action.title,
      });
    case SET_NEW_ITEM_IMAGE:
      return state.merge({
        newItemImageUri: action.imageUri,
      });
    case COMMIT_NEW_ITEM:
      let toCommit = state.get('items').unshift({
        title: state.get('newItemTitle'),
        imageUri: state.get('newItemImageUri'),
        uuid: state.get('newItemUuid'),
        taken: false,
        takenBy: null,
        takenSince: null,
      });
      return state.merge({
        items: toCommit,
      });
    case CLEAR_PENDING_NEW_ITEM:
      return state.merge({
        newItemTitle: '',
        newItemImageUri: null,
        newItemUuid: uuid.v4(),
      });
    case REMOVE_ITEM:
      let postRemoval = state.get('items').filter(item => item.uuid != action.uuid);
      return state.merge({
        items: postRemoval,
      });
    case CHECK_OUT_ITEM:
      let thisItem = state.get('items').find(item => item.uuid == action.uuid);
      let others = state.get('items').filter(item => item.uuid != action.uuid);

      thisItem.taken = true;
      thisItem.takenBy = action.takenBy;
      thisItem.takenSince = moment();

      let newListAfterCheckOut = others.unshift(thisItem);

      return state.merge({
        items: newListAfterCheckOut,
      });
    case CHECK_IN_ITEM:
      let toCheckIn = state.get('items').find(item => item.uuid == action.uuid);
      let othersFromCheckIn = state.get('items').filter(item => item.uuid != action.uuid);

      toCheckIn.taken = false;
      toCheckIn.takenBy = null;
      toCheckIn.takenSince = null;

      let newListAfterCheckIn = othersFromCheckIn.unshift(toCheckIn);

      return state.merge({
        items: newListAfterCheckIn,
      });

    default:
      return state;
  }
}
