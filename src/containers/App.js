import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import postsActions from '../actions/posts';
import authenticateActions from '../actions/authenticate';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import Login from '../components/Login';
import menu from '../electron/MainMenu';
import { Blog, User } from '../gateway/tumblr';

class App extends React.Component {
  updateMenu() {
    const { store, dispatch } = this.props;
    menu({
      authenticate: bindActionCreators(authenticateActions, dispatch),
      posts: bindActionCreators(postsActions, dispatch),
    }, store, this.createTumblr());
  }

  componentDidMount() {
    this.updateMenu();
  }

  componentWillUpdate() {
    this.updateMenu();
  }

  createTumblr() {
    const { authenticate } = this.props;
    return new Blog('mzp-text.tumblr.com',
      authenticate.accessToken,
      authenticate.accessTokenSecret);
  }

  editor() {
    const { authenticate, posts, dispatch } = this.props;
    const actions = bindActionCreators(postsActions, dispatch);
    const post = posts.find((post) => post.selected);
    const tumblr = this.createTumblr();
    return (
      <div id="layout">
        <Sidebar posts={posts} tumblr={tumblr}
          onRemove={actions.remove}
          onSelect={actions.select}
          onCreate={actions.create} />
        <div id="main" className="pure-g">
          <Editor post={post} tumblr={tumblr}
            onChange={actions.change}
            onPost={actions.post} />
          <Preview post={post} />
        </div>
      </div>);
  }

  login() {
    const { authenticate, dispatch } = this.props;
    const actions = bindActionCreators(authenticateActions, dispatch);
    return (
      <Login authenticate={authenticate}
        authorize={actions.authorize}
        getAccessToken={actions.getAccessToken} />);
  }

  render() {
    const { authenticate } = this.props;
    return authenticate.isAuthenticated ? this.editor() : this.login();
  }
}

export default connect((state)=> state)(App);
