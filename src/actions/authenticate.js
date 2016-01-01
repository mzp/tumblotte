import { createAction } from 'redux-actions';
import * as tumblr from '../gateway/tumblr';

export default {
  authorize: createAction('AUTHORIZE', tumblr.getRequestToken),
  getAccessToken: createAction('ACCESS_TOKEN', tumblr.getAccessToken)
};
