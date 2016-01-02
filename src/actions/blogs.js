import { createAction } from 'redux-actions';
import PostStorage from '../storage/PostStorage';

export default {
  select: createAction('SELECT_BLOG', (name) => {
    return PostStorage.posts(name)
      .then((posts) => Promise.resolve({name, posts}));
  }),
  fetch: createAction('FETCH_BLOGS', (user) => user.blogs())
}
