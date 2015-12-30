import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';


@connect((state) => state)
class App extends React.Component {
    render() {
      return <div>Hello World</div>;
    }
}

let store = createStore(function(state, _) { return state; });

let mountNode = document.getElementById('root');

ReactDOM.render(
    <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>,
    mountNode);
