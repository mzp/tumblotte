import PostStorage from '../storage/PostStorage';

export default function(store) {
  return function(next) {
    return function(action) {
      const result = next(action);
      const { blogs, posts } = store.getState();
      const blog = blogs.find((x) => x.selected);
      PostStorage.updates(blog.name, posts);
      return result;
    }
  }
}
