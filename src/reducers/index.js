import { combineReducers } from 'redux';
import authenticate from './authenticate';
import blogs from './blogs';
import posts from './posts';

export default combineReducers({
  authenticate, blogs, posts
});
