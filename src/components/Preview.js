import React from 'react';
import marked from 'marked';
import { Renderer } from 'marked';

// Don't open external link in electron window.
const renderer = new Renderer();
renderer.link = (href, title, text) => {
  return `<a href="#" title=${title} link=${href} >${text}</a>`
};

export default class Preview extends React.Component {
  rawMarkup() {
    const { post } = this.props;
    if(post) {
      const rawMarkup = marked(post.body, { sanitize: true, renderer });
      return { __html: rawMarkup };
    } else {
      return { __html: '' };
    }
  }

  click(e) {
    if (e.target.tagName == 'A') {
      const { onLinkClick } = this.props;
      onLinkClick(e.target.attributes.link.value);
    }
  }

  render() {
    const { post } = this.props;

    return <div id="preview" className="pure-u-1-2 preview">
      <h1 className="preview__title">{post && post.title}</h1>
      <div className="preview__body" dangerouslySetInnerHTML={this.rawMarkup()} onClick={::this.click}/>
    </div>
  }
}
