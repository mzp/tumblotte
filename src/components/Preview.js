import React from 'react';
import marked from 'marked';
import { Renderer } from 'marked';

const template = require('react-jade').compileFile(__dirname + '/Preview.jade');

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

  onClick(e) {
    if (e.target.tagName == 'A') {
      const { onLinkClick } = this.props;
      onLinkClick(e.target.attributes.link.value);
    }
  }

  render() {
    const { post } = this.props;

    return template({
      title: post && post.title,
      body: this.rawMarkup(),
      onClick: ::this.onClick
    });
  }
}
