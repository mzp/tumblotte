import { createAction } from 'redux-actions';
import * as tumblr from '../gateway/tumblr';

export default {
  create: createAction('CREATE'),
  select: createAction('SELECT'),
  change: createAction('CHANGE'),
  post: createAction('POST', (post) =>
    tumblr.create(post.title, post.body)
      .then(() => tumblr.fetchLast())
      .then((response) => Promise.resolve({ post, response}))),

  edit: createAction('EDIT', (post) =>
    tumblr.edit(post.tumblrId, post.title, post.body)
  )
};
