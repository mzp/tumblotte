import { Authenticate } from 'containers/pages/Authenticate';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<Authenticate />', () => {
  const authenticate = {
    authorizeUrl: 'http://example.com',
    requestToken: 'request token',
    requestTokenSecret: 'request token secret'
  };

  describe('webview', () => {
    it('renders webview with url', () => {
      const subject = shallow(<Authenticate authenticate={authenticate} />);
      expect(subject.find('webview')).to.have.attr('src', 'http://example.com');
    });
  });
});
