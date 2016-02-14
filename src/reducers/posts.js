import { handleActions } from 'redux-actions';
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

function unselect(x) {
  return { ...x, selected: false };
}

function selectFirst(xs) {
  return xs.map((x, i) => {
    return { ...x, selected: i == 0 }
  })
}

export default handleActions({
  '@@INIT': (state) =>
    selectFirst(state),

  '@@redux/INIT': (state) =>
    selectFirst(state),

  CREATE: (state, action) => {
    const id = uuid.v1();
    const { blogName } = action.payload;

    return [
      {
        id, blogName,
        content: 'new post\n\nwrite here...',
        dirty: true,
        selected: true
      },
      ...state.map(unselect)
    ];
  },

  REMOVE: (state, action) => {
    return selectFirst(state.filter((x) => x.id != action.payload.id))
  },

  SELECT: (state, action) => {
    return state.map((post) => {
      return { ...post, selected: post.id == action.payload.id };
    });
  },

  CHANGE: (state, action) => {
    const { post, value } = action.payload;
    return updateWith(state, post, (x) => {
      return { ...x, content: value, dirty: true }
    });
  },

  POST: (state, action) => {
    const { post, response } = action.payload;
    return updateWith(state, post, (x) => {
      return { ...x, tumblrId: response.id, dirty: false }
    });
  },

  EDIT: (state, action) => {
    const { post } = action.payload;
    return updateWith(state, post, (x) => {
      return { ...x, dirty: false };
    });
  },

  FETCH: (state, action) => {
    const { blogName, posts } = action.payload;
    const newPosts = posts.map((post) => {
      const { id, title, body, date } = post;
      const old = state.find((x) => x.tumblrId === id);

      return {
        id: old ? old.id : uuid.v1(),
        blogName,
        tumblrId: id,
        content: title + "\n\n" + body.trim(),
        createdAt: new Date(date),
        selected: old ? old.selected : false,
        dirty: false
      };
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
  },

  LOGOUT: () => []
}, []);
