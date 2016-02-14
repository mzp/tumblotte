import Dexie from 'dexie';
import Post from '../values/Post';

function db() {
  const db = new Dexie("Posts");
  db.version(1)
    .stores({
      posts: 'id,blogName,content,tumblrId,dirty,createdAt'
    });
  db.open();
  return db;
}

export default {
  posts: (blogName) => {
    return db().posts
      .where('blogName')
      .equals(blogName)
      .sortBy('createdAt')
      .then((xs) => {
        const ys = xs.map((x) => new Post(x));
        ys.reverse();
        return Promise.resolve(ys);
      });
  },

  updates: (blogName, posts) => {
    const ids = posts.map((x) => x.id);

    const puts =
      posts.map((post) => db().posts.put(post));

    const deletes =
      db().posts
        .where('blogName')
        .equals(blogName)
        .and((post) => ids.indexOf(post.id) === -1)
        .delete();

    return Promise.all(puts).then(() => deletes);
  }
}

