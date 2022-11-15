import { SET_USERNAME } from '../actionTypes';

export function setUsername(input) {
  return {
    type: SET_USERNAME,
    payload: input,
  };
}
