import { handleActions } from 'redux-actions';
import Post from '../values/Post';

function updateWith(state, post, f) {
  return state.map((x) => {
    if (x.id == post.id) {
      return f(x);
    } else {
      return x
    }
  });
}

export default handleActions({
  '@@INIT': (state, action) =>
    state.map((post, i) =>
      new Post({ id: i, selected: false, ...post })),

  CREATE: (state, action) => {
    return [new Post(state.length, 'new post'), ...state];
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
    return updateWith(state, post, (x) => x.change(value))
  },

  POST: (state, action) => {
    const { post, response } = action.payload;
    return updateWith(state, post, (x) => x.post(response.id))
  },

  EDIT: (state, action) => {
    const { post, response } = action.payload;
    return updateWith(state, post, (x) => x.published())
  },
}, []);
