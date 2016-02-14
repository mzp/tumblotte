import React from 'react';
import { connect } from 'react-redux';
import Login from './pages/Login';
import Editor from './pages/Editor';
import Authenticate from './pages/Authenticate';

export class App extends React.Component {
  render() {
    const { authenticate } = this.props;

    if(authenticate.accessToken) {
      return <Editor />;
    } else if(authenticate.authorizeUrl) {
      return <Authenticate />;
    } else {
      return <Login />;
    }
  }
}

export default connect((state)=> state)(App);
