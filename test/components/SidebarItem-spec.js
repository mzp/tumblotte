import SidebarItem from 'components/SidebarItem';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<SidebarItem />', () => {
  describe('title', () => {
    const subject = shallow(<SidebarItem title="foo" />);

    it('reders title', () => {
      expect(subject.find('.sidebar-item__title')).to.be.text('foo');
    });
  });

  describe('body', () => {

    it('reders body', () => {
      const subject = shallow(<SidebarItem body="foo" />);
      expect(subject.find('.sidebar-item__body')).to.be.text('foo');
    });

    it('reders substringed-body', () => {
      const long_text = "foo".repeat(20);
      const subject = shallow(<SidebarItem body={long_text} />);
      expect(subject.find('.sidebar-item__body')).to.have.text().match(/^foo/);
      expect(subject.find('.sidebar-item__body').text().length).to.not.equal(long_text.length);
    });
  });

  describe('className', () => {
    it('reders item', () => {
      const subject = shallow(<SidebarItem />);
      expect(subject).to.have.className('sidebar-item');
      expect(subject).to.not.have.className('sidebar-item--selected');
      expect(subject).to.not.have.className('sidebar-item--dirty');
    });

    it('reders selected item', () => {
      const subject = shallow(<SidebarItem selected={true} />);
      expect(subject).to.have.className('sidebar-item');
      expect(subject).to.have.className('sidebar-item--selected');
      expect(subject).to.not.have.className('sidebar-item--dirty');
    });

    it('reders dirty item', () => {
      const subject = shallow(<SidebarItem dirty={true} />);
      expect(subject).to.have.className('sidebar-item');
      expect(subject).to.not.have.className('sidebar-item--selected');
      expect(subject).to.have.className('sidebar-item--dirty');
    });

    it('reders both item', () => {
      const subject = shallow(<SidebarItem dirty={true} selected={true} />);
      expect(subject).to.have.className('sidebar-item');
      expect(subject).to.have.className('sidebar-item--selected');
      expect(subject).to.have.className('sidebar-item--dirty');
    });
  });

  describe('other props', () => {
    it('pass-through other props', () => {
      const subject = shallow(<SidebarItem id="foo" />);
      expect(subject).to.have.id('foo');
    });
  });
});

