import React from 'react';
import DebounceTextArea from './DebounceTextArea';
import IconButton from './IconButton';

const shell = global.require('shell');

export default class Editor extends React.Component {
  change(event) {
    const { post, onChange } = this.props;
    onChange({ post, value: event.target.value});
  }

  open() {
    const { tumblr, post } = this.props;
    shell.openExternal(tumblr.url(post.tumblrId));
  }

  doPost() {
    const { tumblr, post, onPost } = this.props;
    onPost(tumblr, post);
  }

  render() {
    const { loading, post } = this.props;

    if(!post) {
      return <div id="editor" className="pure-u-1-2 editor editor--unselect" />
    }

    var openButton = '';
    if(post.isPosted) {
      openButton = (
        <IconButton icon='external-link' onClick={::this.open} />);
    }

    return <div id="editor" className="editor pure-u-1-2 pure-form">
            <DebounceTextArea id="editor-textarea" className="editor__text"
               contentId={post.id}
               content={post.content}
               onChange={::this.change} />
            <div className="editor__nav">
              <IconButton primary={true}
                 icon='rocket'
                 loading={loading.post}
                 onClick={::this.doPost} />
              {openButton}
            </div>
          </div>
  }
}
