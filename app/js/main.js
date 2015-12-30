import React from 'react';
import ReactDOM from 'react-dom';

class HelloMessage extends React.Component {
    render() {
      return <div>Hello {this.props.name}</div>;
    }
}

let mountNode = document.getElementById('root');

ReactDOM.render(<HelloMessage name='John' />, mountNode);
