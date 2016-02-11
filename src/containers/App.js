import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import authenticateActions from '../actions/authenticate';
import blogsActions from '../actions/blogs';
import loadingActions from '../actions/loading';
import postsActions from '../actions/posts';
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
      loading: bindActionCreators(loadingActions, dispatch),
      posts: bindActionCreators(postsActions, dispatch),
    }, store, this.createTumblr());
  }

  componentDidMount() {
    this.updateMenu();
  }

  fetchBlogs() {
    const { authenticate, dispatch } = this.props;
    const actions = bindActionCreators(blogsActions, dispatch);

    if(authenticate.isAuthenticated) {
      const user = new User(authenticate.accessToken, authenticate.accessTokenSecret);
      actions.fetch(user);
    }
  }

  componentWillUpdate() {
    this.updateMenu();
  }

  createTumblr() {
    const { blogs, authenticate } = this.props;
    const blog = blogs.find((x) => x.selected);
    if(!blog) { return; }

    const { name } = blog;

    return new Blog(name,
      authenticate.accessToken,
      authenticate.accessTokenSecret);
  }

  openLink(url) {
    global.require('shell').openExternal(url);
  }

  editor() {
    const { authenticate, blogs, loading, posts, dispatch } = this.props;
    const actions = bindActionCreators(postsActions, dispatch);
    const ba = bindActionCreators(blogsActions, dispatch);
    const post = posts.find((post) => post.selected);
    const tumblr = this.createTumblr();
    return (
      <div id="layout">
        <Sidebar blogs={blogs} posts={posts} tumblr={tumblr} loading={loading}
          onSelectBlog={ba.select}
          onFetchBlogs={::this.fetchBlogs}
          onFetch={this.loading('fetch', actions.fetch)}
          onRemove={actions.remove}
          onSelect={actions.select}
          onCreate={actions.create} />
        <div id="main" className="pure-g">
          <Editor post={post} loading={loading} tumblr={tumblr}
            onChange={actions.change}
            onPost={this.loading('post', actions.post)} />
          <Preview post={post} onLinkClick={::this.openLink} />
        </div>
      </div>);
  }

  loading(name, f) {
    return (...args) =>  {
      const { dispatch } = this.props;
      const actions = bindActionCreators(loadingActions, dispatch);
      actions.start(name);
      return f(...args);
    }
  }

  login() {
    const { authenticate, loading, dispatch } = this.props;
    const actions = bindActionCreators(authenticateActions, dispatch);
    return (
      <Login authenticate={authenticate}
        authorize={this.loading('authorize', actions.authorize)}
        loading={loading}
        getAccessToken={actions.getAccessToken} />);
  }

  render() {
    const { authenticate } = this.props;
    return authenticate.isAuthenticated ? this.editor() : this.login();
  }
}

export default connect((state)=> state)(App);
