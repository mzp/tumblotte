import React from 'react';

export default class Editor extends React.Component {
  change(e) {
    const { post, onChange } = this.props;
    onChange({ post, value: e.target.value});
  }

  doPost() {
    const { post, onPost } = this.props;
    onPost(post);
  }

  render() {
    const { post } = this.props;
    const content = post && post.content;

    return <div id="editor" className="pure-u-1-2 pure-form pure-group">
            <textarea value={content || ''} onChange={::this.change} />
            <div className="nav">
              <button className="pure-button" onClick={::this.doPost}>Post</button>
            </div>
          </div>

  }
}
