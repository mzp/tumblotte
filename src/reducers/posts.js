import { handleActions } from 'redux-actions';
import Post from '../values/Post';

const POSTS = [
  new Post(0, 'Hello World 1\n\n# the test post'),
  new Post(1, 'Hello World 2\n\n# the next post'),
];

export default handleActions({
  CREATE: (state, action) => {
    return state;
  },
  SELECT: (state, action) => {
    return state.map((post) => {
      if (post.id == action.payload.id) {
        return post.select()
      } else {
        return post.unselect()
      }
    });
  },
  CHANGE: (state, action) => {
    const { post, value } = action.payload;
    return state.map((x) => {
      if (x.id == post.id) {
        return x.change(value);
      } else {
        return x
      }
    });
    return state;
  }
}, POSTS);
