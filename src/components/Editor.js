import React from 'react';

export default class Editor extends React.Component {
  change(e) {
    const { post, onChange } = this.props;
    onChange({ post, value: e.target.value});
  }

  remove() {
    const { post, onRemove } = this.props;
    onRemove(post);
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

    const content = post.content;
    const buttonTitle = post.isPosted ? 'Update' : 'Create';

    return <div id="editor" className="editor pure-u-1-2 pure-form pure-group">
            <textarea className="editor__text" value={content} onChange={::this.change} />
            <div className="editor__nav">
              <button className="pure-button" onClick={::this.doPost}>{buttonTitle}</button>
              <button className="pure-button" onClick={::this.remove}>Remove</button>
            </div>
          </div>
  }
}
