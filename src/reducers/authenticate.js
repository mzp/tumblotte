import { handleActions } from 'redux-actions';
import Authenticate from '../values/Authenticate';

export default handleActions({
  '@@INIT': (state, action) => {
    return new Authenticate(state).init();
  },

  '@@redux/INIT': (state, action) => {
    return new Authenticate(state).init();
  },

  AUTHORIZE: (state, action) => {
    const { authorizeUrl, requestToken, requestTokenSecret } = action.payload;
    return state.authorize(authorizeUrl, requestToken, requestTokenSecret);
  },

  ACCESS_TOKEN: (state, action) => {
    const { accessToken, accessTokenSecret } = action.payload;
    return state.verify(accessToken, accessTokenSecret);
  },

  LOGOUT: (state, action) => { return new Authenticate({}) }
}, { });
