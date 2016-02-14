import { createAction } from 'redux-actions';
import Tumblr from '../gateway/tumblr';

export default {
  authorize: createAction('AUTHORIZE', (...args) => Tumblr.getRequestToken(...args)),
  getAccessToken: createAction('ACCESS_TOKEN', (...args) => Tumblr.getAccessToken(...args)),
  logout: createAction('LOGOUT')
};
