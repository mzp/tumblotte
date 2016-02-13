/*import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';


import { Editor } from 'containers/pages/Editor';
import IconButton from 'components/IconButton';
import SelectBox from 'components/SelectBox';

describe('<Editor />', () => {
 describe('blog action', () => {
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
    });

    describe('remove button', () => {
      const button = actions.find(IconButton).at(1);

      it('renders button', () => {
        expect(button).to.have.prop('icon', 'trash-o');
      });
    });

    describe('fetch button', () => {
      const button = actions.find(IconButton).at(2);

      it('renders button', () => {
        expect(button).to.have.prop('icon', 'refresh');
      });

      context('loading', () => {
      });
    });
  });
  describe('sidebar item', () => {});
  describe('textarea', () => {});
  describe('preview', () => {});
});*/
