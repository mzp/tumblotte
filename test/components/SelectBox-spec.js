import SelectBox from 'components/SelectBox';
import React from 'react';
import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import { spy } from 'sinon';

describe('<SelectBox />', () => {
  describe('defaultValue', () => {
    const items = [
      { name: 'foo', title: 'Foo' },
      { name: 'bar', title: 'Bar', selected: true },
      { name: 'baz', title: 'Baz' }
    ];
    const subject = render(<SelectBox items={items} />);
    it('renders defaultValue', () => {
      expect(subject.find('option[selected]')).to.have.attr('value', 'bar');
    });
  });

  describe('<option />', () => {
    const items = [
      { name: 'foo', title: 'Foo' },
      { name: 'bar', title: 'Bar' },
      { name: 'baz', title: 'Baz' }
    ];
    const subject = shallow(<SelectBox items={items} />);

    it('renders <option />', () => {
      expect(subject.find('option')).to.have.length(3);
    });

    it('renders title', () => {
      expect(subject.find('option').first()).to.be.text('Foo');
    });

    it('renders value', () => {
      expect(subject.find('option').first()).to.have.attr('value', 'foo');
    });
  });

  describe('onSelect', () => {
    const items = [
      { value: 'foo', title: 'Foo' },
      { value: 'bar', title: 'Bar' },
      { value: 'baz', title: 'Baz' }
    ];
    it('calls onSelect', () => {
      const onSelect = spy();
      const subject = shallow(<SelectBox items={items} onSelect={onSelect} />);
      subject.find('select').first().simulate('change', { target: { value: 'foo' } });
      expect(onSelect.calledWith('foo')).to.equal(true);
    });
  });
});
