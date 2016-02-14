import { handleActions } from 'redux-actions';

export default handleActions({
  SELECT_BLOG: (state, action) => {
    return state.map((blog) => {
      const { name } = action.payload;
      return { ...blog, selected: blog.name === name }
    })
  },

  FETCH_BLOGS: (state, action) => {
    const isSelect = state.find((x) => x.selected);

    const blogs = action.payload.map(({ name, title }, i) => {
      var selected = false;

      if(isSelect) {
        const old = state.find((blog) => blog.name === name);
        selected = old && old.selected;
      } else {
        // 選択されてない状態なら先頭を選択する
        selected = i == 0;
      }

      return { name, title, selected }
    });



    return blogs;
  },

  LOGOUT: () => []
}, []);
