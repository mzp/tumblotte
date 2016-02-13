import React from 'react';
import FontAwesome from 'react-fontawesome';
import SidebarItem from './SidebarItem';
import IconButton from './IconButton';
import SelectBox from './SelectBox';

export default class Sidebar extends React.Component {
  componentDidMount() {
    const { onFetchBlogs } = this.props;
    onFetchBlogs();
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

  selectedBlog() {
    const { blogs } = this.props;
    return blogs.find((blog) => blog.selected);
  }

  render() {
    const { blogs, loading, posts, onSelectBlog } = this.props;
    const blogItems = blogs.map(({ name, title, selected }) => {
      return { value: name, title, selected };
    });
    const blog = this.selectedBlog();
    const items = posts.map(::this.makeItem);

    return <div id="list" className="sidebar">
      <div className="sidebar__nav">
        <div className="sidebar__blogs">
          <SelectBox onSelect={onSelectBlog} items={blogItems} />
        </div>
        <div className="sidebar__actions">
          <IconButton icon='file-o' primary={true} onClick={::this.create} />
          <IconButton icon='trash-o' primary={true} onClick={::this.remove} />
          <IconButton icon='refresh' loading={loading.fetch} onClick={::this.fetch} />
        </div>
      </div>
      <div className='sidebar__items'>
        {items}
      </div>
    </div>;
  }
}
