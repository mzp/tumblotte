import { handleActions } from 'redux-actions';
import Post from '../values/Post';
import * as tumblr from '../gateway/tumblr';

/*tumblr.create('hello', 'world')
  .then(function() {
    return tumblr.fetchLast();
  })
  .then(function(post) {
    console.log(post);
  });
*/

export default handleActions({
  '@@INIT': (state, action) =>
    state.map((post, i) => new Post(i, post.content)),

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
    return state.map((x) => {
      if (x.id == post.id) {
        return x.change(value);
      } else {
        return x
      }
    });
    return state;
  },

  POST: (state, action) => {
    return state
  }
}, []);
