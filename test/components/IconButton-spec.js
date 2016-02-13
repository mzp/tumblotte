import FontAwesome from 'react-fontawesome';
import IconButton from 'components/IconButton';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<IconButton />', () => {
  describe('<button />', () => {
    const subject = shallow(<IconButton icon='rocket' />);

    it('renders <button />', () => {
      expect(subject).to.have.tagName('button')
    });

    it('renders .pure-button', () => {
      expect(subject).to.have.className('pure-button')
    });

    it('renders <FontAwesome />', () => {
      expect(subject).to.contain(<FontAwesome name='rocket' />);
    });
  });

  describe('primary', () => {
    it('renders .primary-button', () => {
      const subject = shallow(<IconButton name='rocket' primary={true} />);
      expect(subject).to.have.className('primary-button')
    });

    it('renders .secondary-button', () => {
      const subject = shallow(<IconButton name='rocket' primary={false} />);
      expect(subject).to.have.className('secondary-button')
    });
  });

  describe('loading', () => {
    it('renders hourglass icon', () => {
      const subject = shallow(<IconButton loading={true} />);
      expect(subject).to.contain(<FontAwesome name='hourglass-half' />);
    });
  });

  describe('size', () => {
    it('renders size attributes', () => {
      const subject = shallow(<IconButton icon='rocket' size='4x' />);
      expect(subject).to.contain(<FontAwesome name='rocket' size='4x' />);
    });
  });
});
