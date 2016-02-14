import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();
const mountNode = document.getElementById('root');

render(
  <Root store={store} />,
  mountNode);
