import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import postsActions from '../actions/posts';

export default class Sidebar extends React.Component {
  select(post) {
    const { onSelect } = this.props;
    onSelect(post);
  }

  render() {
    const { posts } = this.props;
    const items =
      posts.map((post) => {
          return (
              <li key={post.id}
                class={post.selected ? 'selecetd' : ''}
                onClick={::this.select.bind(this, post)}>
                {post.title}
              </li>);
      });

    return <ul>{items}</ul>;
  }
}
