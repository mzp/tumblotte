import FontAwesome from 'react-fontawesome';
import React from 'react';

const template = require('react-jade').compileFile(__dirname + '/IconButton.jade');

export default class IconButton extends React.Component {
  onClick() {
    const { onClick, confirm: confirmText } = this.props;
    if(confirmText) {
      if(global.confirm(confirmText)) {
        onClick();
      }
    } else {
      onClick();
    }
  }

  render() {
    const { onClick, icon, loading, primary, ...props } = this.props;
    const className = primary ?
      "primary-button pure-button" :
      "secondary-button pure-button";
    const iconName = loading ? 'hourglass-half' : icon;

    return template({
      className, onClick: ::this.onClick, iconName, FontAwesome, props
    });
  }
}
