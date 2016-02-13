import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import DevTools from './DevTools';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <App store={store} />
          {this.devTools()}
        </div>
      </Provider>
    );
  }

  devTools() {
    if(window.tumblotteEnv == 'dev') {
      return <DevTools />;
    } else {
      return <div />;
    }
  }
}
