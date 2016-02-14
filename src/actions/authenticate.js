import { createAction } from 'redux-actions';
import Tumblr from '../gateway/tumblr';

export default {
  authorize: createAction('AUTHORIZE', () => Tumblr.getRequestToken()),
  getAccessToken: createAction('ACCESS_TOKEN', () => Tumblr.getAccessToken()),
  logout: createAction('LOGOUT')
};
