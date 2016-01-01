import { handleActions } from 'redux-actions';

export default handleActions({
  '@@INIT': (state, action) => {
    const { accessToken, accessTokenSecret } = state;
    return { accessToken, accessTokenSecret }
  },

  AUTHORIZE: (state, action) => {
    const { authorizeUrl, requestToken, requestTokenSecret } = action.payload;
    return { ...state, authorizeUrl, requestToken, requestTokenSecret };
  },

  ACCESS_TOKEN: (state, action) => {
    const { accessToken, accessTokenSecret } = action.payload;
    return { ...state, accessToken, accessTokenSecret }
  }
}, { });
