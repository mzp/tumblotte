import { handleActions } from 'redux-actions';

const POSTS = [
  { id: 0, title: 'Hello', selected: false },
  { id: 1, title: 'World', selected: false }
];

export default handleActions({
  CREATE: (state, action) => {
    return state;
  },
  SELECT: (state, action) => {
    return state.map((post) => {
      if (post.id == action.payload.id) {
        return { ...post, selected: true }
      } else {
        return { ...post, selected: false }
      }
    });
  }
}, POSTS);
