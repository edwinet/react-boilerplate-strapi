/*
 *
 * Settings actions
 *
 */

import { GET_SCHEMA, GET_SCHEMA_SUCCEEDED, MOVE_CARD, ON_CLICK } from './constants';

export function getSchema(name) {
  return {
    type: GET_SCHEMA,
    name,
  };
}

export function getSchemaSucceeded(schema) {
  return {
    type: GET_SCHEMA_SUCCEEDED,
    schema,
  };
}

export function moveCard(dragIndex, hoverIndex) {
  return {
    type: MOVE_CARD,
    dragIndex,
    hoverIndex,
  };
}


export function onClick(data) {
  return {
    type: ON_CLICK,
    data,
  };
}