import React from 'react';
import FontAwesome from 'react-fontawesome';
import debounce from 'lodash.debounce';

const shell = global.require('shell');

export default class Editor extends React.Component {
  constructor() {
    super();

    this.delayedCallback = debounce((event) => {
      const { post, onChange } = this.props;
      onChange({ post, value: event.target.value});
    }, 300);
  }

  componentWillUpdate() {
    const { post } = this.props;

    // textareaをuncontrolled componentにしてるので、
    // ポストが切り替わったタイミングの更新は自分でやる。
    if(post && this.prevId != post.id) {
      const textarea = document.getElementById('editor-textarea');
      textarea.value = post.content;
      this.prevId = post.id;
    }
  }

  change(event) {
    event.persist();
    this.delayedCallback(event);
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
            <textarea id="editor-textarea" className="editor__text"
               defaultValue={post.content}
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
