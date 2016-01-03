import Dexie from 'Dexie';

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
    return db.posts.where('blogName').equals(blogName).toArray()
  },

  updates: (posts) => {
    const xs = posts.map((post) => db().posts.put(post));
    return Promise.all(xs);
  }
}

