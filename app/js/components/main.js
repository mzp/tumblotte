import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import postsActions from '../actions/posts';

export default class Main extends React.Component {
  inc() {
    const { actions } = this.props;
    actions.create();
  }

  render() {
    const { posts } = this.props;

    return <div><p>{posts}</p><button onClick={::this.inc}>inc</button></div>
  }
}
