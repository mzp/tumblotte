import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import promiseMiddleware from 'redux-promise';
import { default as persistStorage } from 'redux-localstorage';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import storeDB from '../storage/middleware';

function devTools() {
  if( window.tumblotteEnv == 'dev' ) {
    return compose(
      DevTools.instrument(),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&]+)\b/
        )));
  } else {
    return (x) => x;
  }
}

const finalCreateStore = compose(
  applyMiddleware(promiseMiddleware, storeDB),
  persistStorage(['authenticate', 'blogs', 'posts']),
  devTools()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  return store;
}
