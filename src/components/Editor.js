import React from 'react';

export default class Editor extends React.Component {
  render() {
    const { post } = this.props;
    const content = post && post.content;

    return <div id="editor" className="pure-u-1-2 pure-form pure-group">
            <textarea value={content || ''}/>
          </div>

  }
}
