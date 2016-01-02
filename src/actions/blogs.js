import { createAction } from 'redux-actions';

export default {
  fetch: createAction('FETCH_BLOGS', (user) => user.blogs())
}
