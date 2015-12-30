import { handleActions } from 'redux-actions';
import Post from '../values/Post';

const POSTS = [
  new Post(0, 'Hello World 1\nthe test post'),
  new Post(1, 'Hello World 2\nthe next post'),
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
  }
}, POSTS);
