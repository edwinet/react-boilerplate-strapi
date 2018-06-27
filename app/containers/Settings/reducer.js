/*
 *
 * Settings reducer
 *
 */

import { fromJS, List } from 'immutable';
import { GET_SCHEMA_SUCCEEDED, MOVE_CARD, ON_CLICK } from './constants';

export const initialState = fromJS({
  schema: fromJS({}),
  schemaList: List([]),
});

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SCHEMA_SUCCEEDED:
      return state
        .update('schema', () => fromJS(action.schema))
        .update('schemaList', () => {
          return fromJS(action.schema.listDisplay);
        });
    case MOVE_CARD:
      return state
        .update('schemaList', list => list
          .delete(action.dragIndex)
          .insert(action.hoverIndex, list.get(action.dragIndex))
        );
    case ON_CLICK:
      return state.update('schemaList', list => list.push(action.data));
    default:
      return state;
  }
}

export default settingsReducer;
