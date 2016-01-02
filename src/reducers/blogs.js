import { handleActions } from 'redux-actions';

export default handleActions({
  SELECT_BLOG: (state, action) => {
    return state.map((blog) => {
      const { name } = action.payload;
      return { ...blog, selected: blog.name === name }
    })
  },

  FETCH_BLOGS: (state, action) => {
    return action.payload.map(({ name, title }) => {
      const old = state.find((blog) => blog.name === name);
      const selected = old && old.selected;
      return { name, title, selected }
    })
  }
}, []);
