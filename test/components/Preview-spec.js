import Preview from 'components/Preview';
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';

describe('<Preview />', () => {
  context('without post', () => {
    const subject = shallow(<Preview />);

      it('renders #preview', () => {
        expect(subject).to.have.id('preview');
      });

      it('renders empty title', () => {
        expect(subject.find('.preview__title')).to.be.text('');
      });
  });

  context('with post', () => {
    const title = 'So Long, and Thanks for All the Fish';

    const body = `
# Heading 1
## Heading 2

Go to [example.com](http://example.com)
        `;

    const subject = render(<Preview title={title} body={body} />);

    it('renders title', () => {
      expect(subject.find('.preview__title')).to.be.text('So Long, and Thanks for All the Fish');
    });

    describe('markup text', () => {
      const body = subject.find('.preview__body');

      it('renders <h1 />, <h2 />', () => {
        expect(body.find('h1')).to.be.text('Heading 1');
        expect(body.find('h2')).to.be.text('Heading 2');
      });

      describe('<a />', () => {
        const a = body.find('a');
        it('has not href', () => {
          expect(a).to.have.attr('href', '#');
        });

        it('has url', () => {
          expect(a).to.have.attr('link', 'http://example.com');
        });
      });
    });
  });
});
