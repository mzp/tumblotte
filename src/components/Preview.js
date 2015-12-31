import React from 'react';
import marked from 'marked';

export default class Preview extends React.Component {
  rawMarkup() {
    const { post } = this.props;

    if(post) {
      const rawMarkup = marked(post.body, {sanitize: true});
      return { __html: rawMarkup };
    } else {
      return { __html: '' };
    }
  }

  render() {
    const { post } = this.props;

    return <div id="preview" className="pure-u-1-2">
      <h1>{post && post.title}</h1>
      <div dangerouslySetInnerHTML={this.rawMarkup()} />
    </div>
  }
}
