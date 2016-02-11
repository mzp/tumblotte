import React from 'react';
import DebounceTextArea from './DebounceTextArea';
import IconButton from './IconButton';

const template = require('react-jade').compileFile(__dirname + '/Editor.jade');

export default class Editor extends React.Component {
  change(event) {
    const { post, onChange } = this.props;
    onChange({ post, value: event.target.value});
  }

  doOpen() {
    const shell = global.require('shell');
    const { tumblr, post } = this.props;
    shell.openExternal(tumblr.url(post.tumblrId));
  }

  doPost() {
    const { tumblr, post, onPost } = this.props;
    onPost(tumblr, post);
  }

  render() {
    const { loading, post } = this.props;

    const { id, content, isPosted } = post || {};
    return template({
      DebounceTextArea,
      IconButton,
      id,
      isPosted,
      content,
      loading: loading && loading.post,
      doOpen: ::this.doOpen,
      doPost: ::this.doPost,
      onChange: ::this.change,
    });
  }
}
