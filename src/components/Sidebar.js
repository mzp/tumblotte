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
            `sidebar__item
            ${post.selected ? 'sidebar__item--selected' : ''}
            ${post.dirty ? 'sidebar__item--dirty' : ''}`;

          return (
              <div key={post.id}
                className={className}
                onClick={::this.select.bind(this, post)}>
                <h4 className="sidebar__item-title">{post.title}</h4>
                <p className='sidebar__item-body'>{post.body.substring(0, 20)}</p>
              </div>);
      });

    return <div id="list" className="sidebar">
      <div className="sidebar__nav">
        <button className="primary-button pure-button" onClick={::this.create}>Compose</button>
      </div>
      {items}
    </div>;
  }
}
