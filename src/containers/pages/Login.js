import IconButton from '../../components/IconButton';
import React from 'react';
import actions from '../../actions/authenticate';
import { connect } from '../concerns/connect';

const template = require('react-jade').compileFile(__dirname + '/Login.jade');

export class Login extends React.Component {
  render() {
    const { authorize, loading } = this.props;
    return template({
      authorize: authorize,
      loading: loading.authorize,
      IconButton,
    });
  }
}

export default connect(actions, { loading: true })(Login);
