import { createStore, applyMiddleware, compose } from 'redux';
import { default as persistStorage } from 'redux-localstorage';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  persistStorage(['posts'])
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
