import { createStore, applyMiddleware, compose } from 'redux';
import { default as persistStorage } from 'redux-localstorage';
import promiseMiddleware from 'redux-promise';
import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(promiseMiddleware),
  persistStorage(['authenticate', 'blogs', 'posts'])
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
