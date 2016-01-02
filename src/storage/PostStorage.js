import Dexie from 'Dexie';

const db = new Dexie("Posts");
db.version(1)
  .stores({
    posts: '++id,blogName,content,tumblrId,dirty'
  });

db.open();

export default {
  posts: (blogName) => {
    return db.posts.where('blogName').equals(blogName).toArray()
  },

//  add: (blogName, content, tumblrId, dirty) =>
}

