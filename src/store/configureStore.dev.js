import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import promiseMiddleware from 'redux-promise';
import { default as persistStorage } from 'redux-localstorage';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import storeDB from '../storage/middleware';

const finalCreateStore = compose(
  applyMiddleware(promiseMiddleware, storeDB),
  persistStorage(['authenticate', 'blogs', 'posts']),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
