import React from 'react';

export default class Editor extends React.Component {
  change(e) {
    const { post, onChange } = this.props;
    onChange({ post, value: e.target.value});
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
      return <div id="editor" className="pure-u-1-2" />
    }

    const content = post.content;
    const buttonTitle = post.isPosted ? 'Update' : 'Create';

    return <div id="editor" className="pure-u-1-2 pure-form pure-group">
            <textarea value={content} onChange={::this.change} />
            <div className="nav">
              <button className="pure-button" onClick={::this.doPost}>{buttonTitle}</button>
            </div>
          </div>
  }
}
