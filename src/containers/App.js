import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import postsActions from '../actions/posts';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import Preview from '../components/Preview';

class App extends React.Component {
  render() {
    const { posts , dispatch } = this.props;
    const actions = bindActionCreators(postsActions, dispatch);
    const post = posts.find((post) => post.selected);

    return (
      <div id="layout">
        <Sidebar posts={posts} onSelect={actions.select} onCreate={actions.create} />
        <div id="main" className="pure-g">
          <Editor post={post}
            onChange={actions.change}
            onRemove={actions.remove}
            onPost={actions.post}
            onEdit={actions.edit} />
          <Preview post={post} />
        </div>
      </div>);
  }
}

export default connect((state)=> state)(App);
