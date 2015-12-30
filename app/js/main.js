import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import posts from './reducers/posts';
import App from './containers/App';

const store = createStore(combineReducers({ posts }));
const mountNode = document.getElementById('root');

ReactDOM.render(
    <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>,
    mountNode);
