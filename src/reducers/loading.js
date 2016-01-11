import { handleActions } from 'redux-actions';

export default handleActions({
  START_LOADING: (state, action) => {
    return { ...state, [action.payload]: true };
  },

  AUTHORIZE: (state, action) => {
    return { ...state, authorize: false };
  },

  FETCH: (state, action) => {
    return { ...state, fetch: false };
  },

  POST: (state, action) => {
    return { ...state, post: false };
  },

  EDIT: (state, actions) => {
    return { ...state, post: false };
  }
}, {});
