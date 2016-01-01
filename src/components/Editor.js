import React from 'react';
import FontAwesome from 'react-fontawesome';
import { url } from '../gateway/tumblr';
const shell = global.require('shell');

export default class Editor extends React.Component {
  change(e) {
    const { post, onChange } = this.props;
    onChange({ post, value: e.target.value});
  }

  open() {
    const { post } = this.props;
    shell.openExternal(url(post.tumblrId));
  }

  doPost() {
    const { post, onEdit, onPost } = this.props;

    if(post.isPosted) {
      onEdit(post);
    } else {
      onPost(post);
    }
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <div id="editor" className="pure-u-1-2 editor editor--unselect" />
    }

    var openButton = '';
    if(post.isPosted) {
      openButton = (
        <button className="secondary-button pure-button" onClick={::this.open}>
          <FontAwesome name='external-link' />
        </button>);
    }

    return <div id="editor" className="editor pure-u-1-2 pure-form">
            <textarea className="editor__text"
               value={post.content}
               onChange={::this.change} />
            <div className="editor__nav">
              <button className="primary-button pure-button" onClick={::this.doPost}>
                <FontAwesome name='rocket' />
              </button>
              {openButton}
            </div>
          </div>
  }
}
