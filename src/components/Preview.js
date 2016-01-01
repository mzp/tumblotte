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

    return <div id="preview" className="pure-u-1-2 preview">
      <h1 className="preview__title">{post && post.title}</h1>
      <div className="preview__body" dangerouslySetInnerHTML={this.rawMarkup()} />
    </div>
  }
}
