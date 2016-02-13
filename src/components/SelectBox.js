import React from 'react';

const template = require('react-jade').compileFile(__dirname + '/SelectBox.jade');

export default class SelectBox extends React.Component {
  onChange(event) {
    this.props.onSelect(event.target.value);
  }

  render() {
    const { items } = this.props;
    const defaultValue = (items.find((x) => x.selected) || {}).value;
    return template({ defaultValue, items, onChange: ::this.onChange });
  }
}

