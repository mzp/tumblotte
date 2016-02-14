import { handleActions } from 'redux-actions';

export default handleActions({
  '@@INIT': (state) => {
    return { ...state, authorizeUrl: null, requestToken: null, requestTokenSecret: null };
  },

  '@@redux/INIT': (state) => {
    return { ...state, authorizeUrl: null, requestToken: null, requestTokenSecret: null };
  },

  AUTHORIZE: (state, action) => {
    const { authorizeUrl, requestToken, requestTokenSecret } = action.payload;
    return { ...state, authorizeUrl, requestToken, requestTokenSecret };
  },

  ACCESS_TOKEN: (state, action) => {
    const { accessToken, accessTokenSecret } = action.payload;
    return { ...state, accessToken, accessTokenSecret };
  },

  LOGOUT: () => { return {}; }
}, {});
