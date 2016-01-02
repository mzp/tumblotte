import { createAction } from 'redux-actions';

export default {
  select: createAction('SELECT_BLOG'),
  fetch: createAction('FETCH_BLOGS', (user) => user.blogs())
}
