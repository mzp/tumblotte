import IconButton from '../../components/IconButton';
import React from 'react';
import actions from '../../actions/authenticate';
import { connect } from '../concerns/connect';
import menu from '../../electron/MainMenu';

const template = require('react-jade').compileFile(__dirname + '/Login.jade');

export class Login extends React.Component {
  componentDidMount() {
    menu();
  }

  render() {
    const { authorize, loading } = this.props;
    return template({
      authorize: authorize,
      loading: loading.authorize,
      IconButton
    });
  }
}

export default connect(actions, { loading: true })(Login);
