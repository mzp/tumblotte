import { combineReducers } from 'redux';
import authenticate from './authenticate';
import blogs from './blogs';
import loading from './loading';
import posts from './posts';

export default combineReducers({
  authenticate, blogs, loading, posts
});
