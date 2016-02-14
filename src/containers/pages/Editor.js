import React from 'react';

import DebounceTextArea from '../..//components/DebounceTextArea';
import IconButton from '../../components/IconButton';
import Preview from '../../components/Preview';
import SelectBox from '../../components/SelectBox';
import SidebarItem from '../../components/SidebarItem';
import authenticateAction from '../../actions/authenticate';
import blogAction from '../../actions/blogs';
import postAction from '../../actions/posts';
import { connectCombine } from '../concerns/connect';
import { Blog, User } from '../../gateway/tumblr';
import menu from '../../electron/MainMenu';

const template = require('react-jade').compileFile(__dirname + '/Editor.jade');

export class Editor extends React.Component {
  // ------------------------------------------------------------
  // Life cycle
  // ------------------------------------------------------------
  componentDidMount() {
    const {
      authenticate,
      authenticateAction,
      blogAction,
      postAction
    } = this.props;

    const user = new User(authenticate.accessToken, authenticate.accessTokenSecret);
    blogAction.fetch(user);
    menu({
      create: ::this.createPost,
      fetch: ::this.fetchPosts,
      post: () => {
        postAction.post(this.tumblr(), this.selectedPost())
      },
      logout: authenticateAction.logout
    });
  }

  render() {
    return template({
      blogs: this.blogs(),
      posts: this.posts(),
      tumblr: this.tumblr(),
      loading: this.props.loading,
      post: this.selectedPost(),
      ...this.components(),
      ...this.actions()
    });
  }

  // ------------------------------------------------------------
  // dependencies
  // ------------------------------------------------------------
  components() {
    return {
      IconButton,
      DebounceTextArea,
      SelectBox,
      SidebarItem,
      Preview
    };
  }

  // ------------------------------------------------------------
  // stores
  // ------------------------------------------------------------
  blogs() {
    return this.props.blogs.map(({ name, title, selected }) => {
      return { value: name, title, selected };
    });
  }

  posts() {
    return this.props.posts.map((post) => {
      return { title: post.title, body: post.body, ...post }
    });
  }

  selectedBlog() {
    const { blogs } = this.props;
    return blogs.find((blog) => blog.selected);
  }

  selectedPost() {
    const { posts } = this.props;
    return posts.find((post) => post.selected);

  }

  tumblr() {
    if(!this.selectedBlog()) { return; }

    const { authenticate } = this.props;
    const { name } = this.selectedBlog();

    return new Blog(name,
      authenticate.accessToken,
      authenticate.accessTokenSecret);
  }

  // ------------------------------------------------------------
  // Actions
  // ------------------------------------------------------------
  actions() {
    const { blogAction, postAction } = this.props;
    return {
      blogAction,
      postAction,
      createPost: ::this.createPost,
      removePost: ::this.removePost,
      fetchPosts: ::this.fetchPosts,
      changeText: ::this.changeText,
      openLink: ::this.openLink,
      openExternal: this.openExternal
    };
  }

  changeText(post, event) {
    const { postAction } = this.props;
    postAction.change({ post, value: event.target.value });
  }

  createPost() {
    const { postAction } = this.props;
    const { name } = this.selectedBlog();
    postAction.create({ blogName: name });
  }

  removePost() {
    const { posts, postAction } = this.props;

    if(confirm('(๑•﹏•)?')) {
      posts.forEach((post) => {
        if(post.selected) {
          postAction.remove(post);
        }
      });
    }
  }

  fetchPosts() {
    const { postAction } = this.props;
    postAction.fetch(this.tumblr());
  }

  openLink(post) {
    openExternal(this.tumblr().url(post.tumblrId));
  }

  openExternal(url) {
    global.require('shell').openExternal(url);
  }
}

export default connectCombine({
  authenticateAction, blogAction, postAction
}, {
  loading: true
})(Editor);
