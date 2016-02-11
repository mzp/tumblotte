import DebounceTextArea from 'components/DebounceTextArea';
import Editor from 'components/Editor';
import IconButton from 'components/IconButton';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<Editor />', () => {
  context('without post', () => {
    const subject = shallow(<Editor />);

    it('renders .editor', () => {
      expect(subject).to.have.className('editor');
    });

    it('doesnt render <DebounceTextArea />', () => {
      expect(subject).to.not.contain(<DebounceTextArea />);
    });

    it('doesnt render .editor__nav', () => {
      expect(subject).to.not.have.className('editor__nav');
    });
  });

  context('with post', () => {
    const post = { id: 42, content: 'answer' };

    describe('textarea', () => {
      const subject = shallow(<Editor post={post} />);
      const textarea = subject.find(DebounceTextArea);

      it('renders <DebounceTextArea />', () => {
        expect(textarea).to.have.prop('contentId', 42);
        expect(textarea).to.have.prop('content', 'answer');
      });
    });

    describe('post button', () => {
      context('normal', () => {
        const subject = shallow(<Editor post={post} />);
        const button = subject.find(IconButton).first();

        it('renders rocket', () => {
          expect(button).to.have.prop('icon', 'rocket');
        });
      });

      context('loading', () => {
        const subject = shallow(<Editor post={post} loading={{post: true}} />);
        const button = subject.find(IconButton).first();

        it('renders loading', () => {
          expect(button).to.have.prop('loading', true);
        });
      });
    });

    describe('open button', () => {
      context('not posted', () => {
        const subject = shallow(<Editor post={post} />);
        const button = subject.find(IconButton).last();

        it('doesnt render external-link', () => {
          expect(button).to.not.have.prop('icon', 'external-link');
        });
      });

      context('posted', () => {
        const subject = shallow(<Editor post={{...post, isPosted: true}} />);
        const button = subject.find(IconButton).last();

        it('renders external-link', () => {
          expect(button).to.have.prop('icon', 'external-link');
        });
      });
    });
  });
});
