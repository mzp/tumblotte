import FontAwesome from 'react-fontawesome';
import React from 'react';

export default class Login extends React.Component {
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

  componentDidUpdate() {
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
    const { authorize, authenticate: { authorizeUrl }} = this.props;

    if (authorizeUrl) {
      return <div id='login' className='login'><webview id='tumblr-auth' src={authorizeUrl} nodeintegration></webview></div>
    } else {
      return (
        <div id='login' className='login'>
          <button className='pure-button primary-button login__button' onClick={authorize}>
            <FontAwesome name='sign-in' size='4x' />
          </button>
        </div>);
    }
  }
}

