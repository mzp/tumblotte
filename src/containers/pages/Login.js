import IconButton from '../../components/IconButton';
import React from 'react';
import actions from '../../actions/authenticate';
import { connectWithLoading } from '../concerns/connect';

const template = require('react-jade').compileFile(__dirname + '/Login.jade');

class Login extends React.Component {
  render() {
    const { authorize, loading } = this.props;
    return template({
      authorize: authorize,
      loading: loading.authorize,
      IconButton,
    });
  }
}

export default connectWithLoading(actions)(Login);
