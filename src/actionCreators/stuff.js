import simpleStore from 'react-native-simple-store';

export const LOADING_LOCAL_DATA = 'LOADING_LOCAL_DATA';
export const FINISHED_LOADING_LOCAL_DATA = 'FINISHED_LOADING_LOCAL_DATA';
export const ADD_ITEM = 'ADD_ITEM';
export const SET_NEW_ITEM_IMAGE = 'SET_NEW_ITEM_IMAGE';
export const SET_NEW_ITEM_TITLE = 'SET_NEW_ITEM_TITLE';
export const COMMIT_NEW_ITEM = 'COMMIT_NEW_ITEM';
export const CLEAR_PENDING_NEW_ITEM = 'CLEAR_PENDING_NEW_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CHECK_OUT_ITEM = 'CHECK_OUT_ITEM';
export const CHECK_IN_ITEM = 'CHECK_IN_ITEM';

export function getLocalData() {
  return {
    type: 'GET_LOCAL_DATA',
  };
}

export function loadingLocalData() {
  return {
    type: LOADING_LOCAL_DATA,
  };
}

export function finishedLoadingLocalData(stuffList) {
  return {
    type: FINISHED_LOADING_LOCAL_DATA,
    stuffList,
  };
}

export function addItem(title, imageUri='image!logo') {
  return {
    type: ADD_ITEM,
    title,
    imageUri,
  };
}

export function setNewItemImage(imageUri) {
  return {
    type: SET_NEW_ITEM_IMAGE,
    imageUri,
  };
}

export function setNewItemTitle(title) {
  return {
    type: SET_NEW_ITEM_TITLE,
    title,
  };
}

export function commitNewItem() {
  return {
    type: COMMIT_NEW_ITEM,
  };
}

export function clearPendingNewItem() {
  return {
    type: CLEAR_PENDING_NEW_ITEM,
  };
}

export function removeItem(uuid) {
  return {
    type: REMOVE_ITEM,
    uuid,
  };
}

export function checkOutItem(uuid, takenBy) {
  return {
    type: CHECK_OUT_ITEM,
    uuid,
    takenBy,
  };
}

export function checkInItem(uuid) {
  return {
    type: CHECK_IN_ITEM,
    uuid,
  };
}
