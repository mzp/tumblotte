import React from 'react';
import FontAwesome from 'react-fontawesome';
import DebounceTextArea from './DebounceTextArea';

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
    const iconName = loading.post ? 'hourglass-half' : 'rocket';

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
            <DebounceTextArea id="editor-textarea" className="editor__text"
               contentId={post.id}
               content={post.content}
               onChange={::this.change} />
            <div className="editor__nav">
              <button className="primary-button pure-button" onClick={::this.doPost}>
                <FontAwesome name={iconName} />
              </button>
              {openButton}
            </div>
          </div>
  }
}
