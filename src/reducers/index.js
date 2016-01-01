import { combineReducers } from 'redux';
import posts from './posts';
import authenticate from './authenticate';

export default combineReducers({
  posts, authenticate
});
