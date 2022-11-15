import { SET_USERNAME } from '../actionTypes';

const initialState = {
  username: 'ATABLOID',
};

function usernameReducer(state = initialState, action) {
  if (action.type === SET_USERNAME) {
    return { ...state, text: action.payload };
  }
  return state;
}

export default usernameReducer;
