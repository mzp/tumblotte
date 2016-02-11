import DebounceTextArea from 'components/DebounceTextArea';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<DebounceTextArea />', () => {
  describe('content', () => {
    describe('content', () => {
      const subject = shallow(<DebounceTextArea content="foo" />);

      it('renders textarea', () => {
        expect(subject).to.have.html().match(/foo/);
      });
    });

    describe('event', () => {
      it('fires handler', (done) => {
        const onChange = () => { done() };
        const subject = shallow(<DebounceTextArea onChange={onChange} />);
        subject.simulate('change', {
          persist: () => {},
          target: { value: 'bar' }
        });
      });
    });

    describe('other props', () => {
      const subject = shallow(<DebounceTextArea id="foo" className="bar" />);
      it('pass-throug attributes', () => {
        expect(subject).to.have.id('foo');
        expect(subject).to.have.className('bar');
      });
    });
  });
});

