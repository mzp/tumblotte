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
      <div id="layout">
        <Sidebar posts={posts} onSelect={actions.select} />
        <div id="main" className="pure-g">
          <div id="editor" className="pure-u-1-2 pure-form pure-group">
            <textarea />
          </div>
          <div id="preview" className="pure-u-1-2">
            <p>preview</p>
          </div>
        </div>
      </div>);
  }
}

export default connect((state)=> state)(App);
