import { handleActions } from 'redux-actions';

export default handleActions({
  FETCH_BLOGS: (state, action) =>
    action.payload.map(({ name, title }) => { return { name, title } })
}, []);
