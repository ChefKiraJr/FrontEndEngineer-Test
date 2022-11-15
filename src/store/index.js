import { combineReducers, createStore } from 'redux';
import usernameReducer from './reducers/usernameReducer';

const reducer = combineReducers({
  usernameReducer: usernameReducer,
});

const store = createStore(reducer);

export default store;
