import PostStorage from '../storage/PostStorage';

export default function(next) {
  return function(reducer, initialState) {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      PostStorage.updates(store.getState().posts);
    });
    return store;
  }
}
