import React from 'react';
import { connect } from 'react-redux';
import Login from './pages/Login';
import Editor from './pages/Editor';
import Authenticate from './pages/Authenticate';
// import menu from '../electron/MainMenu';

class App extends React.Component {
  /*updateMenu() {
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

  createTumblr() {
    const { blogs, authenticate } = this.props;
    const blog = blogs.find((x) => x.selected);
    if(!blog) { return; }

    const { name } = blog;

    return new Blog(name,
      authenticate.accessToken,
      authenticate.accessTokenSecret);
  }
*/
  render() {
    const { authenticate } = this.props;

    if(authenticate.isAuthenticated) {
      return <Editor />;
    } else if(authenticate.authorizeUrl) {
      return <Authenticate />;
    } else {
      return <Login />;
    }
  }
}

export default connect((state)=> state)(App);
