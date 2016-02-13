import { Login } from 'containers/pages/Login';
import IconButton from 'components/IconButton';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

describe('<Login />', () => {
  describe('sign-in button', () => {
    it('renders sign-in icon', () => {
      const subject = shallow(<Login loading={{ authorize: false }} />);
      expect(subject.find(IconButton)).prop('icon', 'sign-in');
      expect(subject.find(IconButton)).prop('loading', false);
    });

    it('renders loading icon', () => {
      const subject = shallow(<Login loading={{ authorize: true }} />);
      expect(subject.find(IconButton)).prop('loading', true);
    });
  });

  describe('event callback', () => {
    const authorize = spy();
    const subject = shallow(<Login loading={{ authorize: false }} authorize={authorize} />);
    subject.find(IconButton).simulate('click');
    expect(authorize.calledOnce).to.equal(true);
  });
});
