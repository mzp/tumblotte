import { createAction } from 'redux-actions';

export default {
  create: createAction('CREATE', (name) => {
    return { blogName: name };
  }),
  select: createAction('SELECT'),
  change: createAction('CHANGE'),
  remove: createAction('REMOVE'),

  post: (tumblr, post) => {
    if(post.tumblrId) {
      const edit = (tumblr, post) =>
        tumblr.edit(post.tumblrId, post.title, post.body)
          .then((response) => Promise.resolve({ post, response }));
      const action = createAction('EDIT', edit);

      return action(tumblr, post);
    } else {
      const create = (tumblr, post) =>
        tumblr.create(post.title, post.body)
          .then(() => tumblr.fetchLast())
          .then((response) => Promise.resolve({ post, response}));
      const action = createAction('POST', create);

      return action(tumblr, post);
    }
  },

  fetch: createAction('FETCH', (tumblrBlog, count = 10) =>
    tumblrBlog.fetch(count)
      .then((posts) => Promise.resolve({
        blogName: tumblrBlog.name,
        posts
      })))
};
