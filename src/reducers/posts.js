import { handleActions } from 'redux-actions';
import Post from '../values/Post';
import max from 'lodash.max';

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
    const max_id = max(state, (post) => post.id) || { id: 0 };

    return [
      new Post({
        id: ((max_id).id || 0) + 1,
        content: 'new post\n',
        dirty: true
      }),
      ...state
    ];
  },

  REMOVE: (state, action) => {
    return state.filter((x) => x.id != action.payload.id)
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
