import React from 'react';
import FontAwesome from 'react-fontawesome';
import SidebarItem from './SidebarItem';

export default class Sidebar extends React.Component {
  componentDidMount() {
    const { onFetchBlogs } = this.props;
    onFetchBlogs();
  }

  selectBlog(e) {
    const { onSelectBlog } = this.props;
    onSelectBlog(e.target.value);
  }

  select(post) {
    const { onSelect } = this.props;
    onSelect(post);
  }

  create() {
    const { onCreate } = this.props;
    const { name } = this.selectedBlog();
    onCreate({ blogName: name });
  }

  remove() {
    const { posts, onRemove } = this.props;

    if(confirm('(๑•﹏•)?')) {
      posts.forEach((post) => {
        if(post.selected) {
          onRemove(post);
        }
      });
    }
  }

  fetch() {
    const { tumblr, onFetch } = this.props;
    onFetch(tumblr);
  }

  makeItem(post) {
    return <SidebarItem
      key={post.id}
      onClick={::this.select.bind(this, post)}
      title={post.title}
      body={post.body}
      selected={post.selected}
      dirty={post.dirty} />
  }

  makeBlog(blog) {
    return (<option key={blog.name} value={blog.name}>{blog.title}</option>);
  }

  selectedBlog() {
    const { blogs } = this.props;
    return blogs.find((blog) => blog.selected);
  }

  render() {
    const { blogs, loading, posts } = this.props;
    const blogItems = blogs.map(::this.makeBlog);
    const blog = this.selectedBlog();
    const items = posts.map(::this.makeItem);
    const fetchIcon = loading.fetch ? 'hourglass-half' : 'refresh';

    return <div id="list" className="sidebar">
      <div className="sidebar__nav">
        <div className="sidebar__blogs">
          <select onChange={::this.selectBlog} defaultValue={blog && blog.name}>{blogItems}</select>
        </div>
        <div className="sidebar__actions">
          <button className="primary-button pure-button"
            onClick={::this.create}>
            <FontAwesome name='file-o' />
          </button>
          <button className="secondary-button pure-button"
            onClick={::this.remove}>
            <FontAwesome name='trash-o' />
          </button>
          <button className="secondary-button pure-button"
            onClick={::this.fetch}>
            <FontAwesome name={fetchIcon} />
          </button>
        </div>
      </div>
      <div className='sidebar__items'>
        {items}
      </div>
    </div>;
  }
}
