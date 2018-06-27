import { put, takeLatest, fork } from 'redux-saga/effects';

import { getSchemaSucceeded } from './actions';
import { GET_SCHEMA } from './constants';
import json from './schema.json';

export function* schemaGet(action) {
  try {
    const schema = json[action.name];
    yield put(getSchemaSucceeded(schema));
  } catch(err) {
    console.log('fuc', err);
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield fork(takeLatest, GET_SCHEMA, schemaGet);
}
