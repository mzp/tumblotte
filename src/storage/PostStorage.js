import Dexie from 'Dexie';
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

  updates: (posts) => {
    const xs = posts.map((post) => db().posts.put(post));
    return Promise.all(xs);
  }
}

