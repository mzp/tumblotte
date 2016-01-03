import { handleActions } from 'redux-actions';
import Post from '../values/Post';
import max from 'lodash.max';
import uuid from 'node-uuid';

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
    state.map((post) =>
      new Post({ ...post, selected: false })),

  CREATE: (state, action) => {
    const id = uuid.v1();
    const { blogName } = action.payload;

    return [
      new Post({
        id, blogName,
        content: 'new post\n\nwrite here...',
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

  FETCH: (state, action) => {
    const { blogName, posts } = action.payload;
    const newPosts = posts.map((post) => {
      const { id, title, body, date } = post;
      const old = state.find((x) => x.tumblrId === id);

      return new Post({
        id: old ? old.id : uuid.v1(),
        blogName,
        tumblrId: id,
        content: title + "\n\n" + body.trim(),
        createdAt: new Date(date),
        dirty: false
      });
    });

    const remainPosts = state.filter((old) => {
      return !posts.find((post) => old.tumblrId === post.id);
    });

    return [...newPosts, ...remainPosts].sort((x,y) =>
      y.createdAt.getTime() - x.createdAt.getTime());
  },

  SELECT_BLOG: (state, action) => {
    const { posts } = action.payload;
    return posts;
  }
}, []);
