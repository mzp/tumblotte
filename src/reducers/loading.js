import { handleActions } from 'redux-actions';

export default handleActions({
  START_LOADING: (state, action) => {
    return { ...state, [action.payload]: true };
  },

  AUTHORIZE: (state) => {
    return { ...state, authorize: false };
  },

  FETCH: (state) => {
    return { ...state, fetch: false };
  },

  FETCH_BLOGS: (state) => {
    return { ...state, fetch: false };
  },

  POST: (state) => {
    return { ...state, post: false };
  },

  EDIT: (state) => {
    return { ...state, post: false };
  }
}, {});
