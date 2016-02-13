import React from 'react';
import actions from '../../actions/authenticate';
import { connect } from '../concerns/connect';

const template = require('react-jade').compileFile(__dirname + '/Authenticate.jade');

export class Authenticate extends React.Component {
  handle(e) {
    const { getAccessToken, authenticate: {
      requestToken, requestTokenSecret
    } } = this.props;
    const newURL = e.newURL;
    const matched = newURL.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&#]*)/);
    if (matched) {
      getAccessToken(requestToken, requestTokenSecret, matched[2]);
    }
  }

  componentDidMount() {
    const webview = document.getElementById('tumblr-auth');

    if(webview) {
      // メモリリークするかも..。
      // どこかでremoveEventListerしたいけど、thisをbindしているので、
      // そんなに簡単じゃない。
      webview.addEventListener('did-get-redirect-request', ::this.handle);
      webview.addEventListener('will-navigate', ::this.handle);
    }
  }

  render() {
    const { authenticate: { authorizeUrl } } = this.props;
    return template({
      url: authorizeUrl
    });
  }
}

export default connect(actions)(Authenticate);
