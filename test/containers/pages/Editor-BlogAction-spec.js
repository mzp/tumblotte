import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { Editor } from 'containers/pages/Editor';
import IconButton from 'components/IconButton';

describe('<Editor /> - BlogAction', () => {
  const blogs = [
    { title: 'Snake oil', name: 'snake', selected: true }
  ];
  const authenticate = {};
  const posts = [
    { id: 1, content: 'baz', selected: true },
    { id: 2, content: 'xxx', selected: false }
  ];
  const loading = {
    fetch: true
  };
  const blogAction = {};
  const postAction =  {
    create: spy(),
    change: spy(),
    fetch: spy(),
    remove: spy(),
    select: spy(),
    post: spy()
  };

  const subject = shallow(<Editor
      authenticate={authenticate}
      blogs={blogs}
      posts={posts}
      loading={loading}
      blogAction={blogAction}
      postAction={postAction} />);

  const actions = subject.find('.sidebar__actions');
  describe('create button', () => {
    const button = actions.find(IconButton).at(0);

    it('renders button', () => {
      expect(button).to.have.prop('icon', 'file-o');
    });

    it('calls action', () => {
      button.simulate('click');
      expect(postAction.create.calledOnce).to.equal(true);
    });
  });

  describe('remove button', () => {
    const button = actions.find(IconButton).at(1);

    it('renders button', () => {
      expect(button).to.have.prop('icon', 'trash-o');
    });

    it('calls action', () => {
      button.simulate('click');
      expect(postAction.remove.calledOnce).to.equal(true);
    });
  });

  describe('fetch button', () => {
    const button = actions.find(IconButton).at(2);

    it('renders button', () => {
      expect(button).to.have.prop('icon', 'refresh');
    });

    it('renders button', () => {
      expect(button).to.have.prop('loading', true);
    });

    it('calls action', () => {
      button.simulate('click');
      expect(postAction.fetch.calledOnce).to.equal(true);
    });
  });
});
