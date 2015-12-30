import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import postsActions from '../actions/posts';
import Sidebar from '../components/Sidebar';

class App extends React.Component {
  render() {
    const { posts , dispatch } = this.props;
    const actions = bindActionCreators(postsActions, dispatch);

    return (
      <div>
        <Sidebar posts={posts} onSelect={actions.select} />
      </div>);
  }
}

export default connect((state)=> state)(App);
