import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';

export default class DebounceTextArea extends React.Component {
  constructor() {
    super();

    this.delayedCallback = debounce((event) => {
      const { onChange } = this.props;
      onChange(event.target.value);
    }, 300);
  }

  componentDidUpdate() {
    const { contentId, content } = this.props;

    if(contentId && this.previous != contentId) {
      const dom = ReactDOM.findDOMNode(this);
      dom.value = content;
      this.previous = contentId;
    }
  }

  onChange(event) {
    event.persist();
    this.delayedCallback(event);
  }

  render() {
    // ignore on change
    const { content, onChange, ...props } = this.props;
    return <textarea
      defaultValue={content}
      onChange={::this.onChange}
      {...props} />;
  }
}
