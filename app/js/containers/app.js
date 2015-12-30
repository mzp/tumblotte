import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import postsActions from '../actions/posts';
import Main from '../components/Main';

class App extends React.Component {
  render() {
    const { posts , dispatch } = this.props;
    const actions = bindActionCreators(postsActions, dispatch);

    return <div><Main posts={posts} actions={actions} /></div>;
  }
}

export default connect((state)=> state)(App);
