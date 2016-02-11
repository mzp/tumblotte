import React from 'react';
import toPairs from 'lodash.topairs';

const template = require('react-jade').compileFile(__dirname + '/SidebarItem.jade');

export default class SidebarItem extends React.Component {
  body() {
    return (this.props.body || "").substring(0, 20);
  }

  withAttributes(base, attributes) {
    return toPairs(attributes).reduce((acc, [key, value]) => {
      if(value) {
        return `${acc} ${base}--${key}`
      } else {
        return acc;
      }
    }, base);
  }

  render() {
    const { title, dirty, selected, ...props } = this.props;
    const className = this.withAttributes('sidebar-item', {
      dirty,
      selected
    });
    return template({ className, title, body: this.body(), props });
  }
}

