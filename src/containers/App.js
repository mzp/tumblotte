import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import postsActions from '../actions/posts';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';

class App extends React.Component {
  render() {
    const { posts , dispatch } = this.props;
    const actions = bindActionCreators(postsActions, dispatch);

    return (
      <div id="layout">
        <Nav />
        <Sidebar posts={posts} onSelect={actions.select} />
        <div id="main"><p>ここに文書がはいるはず</p></div>
      </div>);
  }
}

export default connect((state)=> state)(App);
