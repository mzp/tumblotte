import React from 'react';
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
          const className =
            `email-item ${post.selected ? 'email-item-selected' : ''}`;

          return (
              <div key={post.id}
                className={className}
                onClick={::this.select.bind(this, post)}>
                <h4>{post.title}</h4>
              </div>);
      });

    return <div id="list">{items}</div>;
  }
}
