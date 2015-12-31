import React from 'react';

export default class Sidebar extends React.Component {
  select(post) {
    const { onSelect } = this.props;
    onSelect(post);
  }

  create() {
    const { onCreate } = this.props;
    onCreate();
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
                <p className='email-desc'>{post.body.substring(0, 20)}</p>
              </div>);
      });

    return <div id="list">
      <div className="nav">
        <button className="primary-button pure-button" onClick={::this.create}>Compose</button>
      </div>
      {items}
    </div>;
  }
}
