import actions from 'actions/blogs'
import { expect } from 'chai';
import { mock } from 'sinon';
import PostStorage from 'storage/PostStorage';

describe('blogs', () => {
  describe('select', () => {
    const m = mock(PostStorage);
    const posts = [];
    m.expects('posts').withArgs('snake').returns(Promise.resolve(posts));

    const action = actions.select('snake');

    it('has FETCH_BLOGS type', () =>
        expect(action.payload).eventually.to.property('name', 'snake'));

    it('has FETCH_BLOGS type', () =>
        expect(action.payload).eventually.to.property('posts')
          .that.deep.equals(posts));

    it('has FETCH_BLOGS type', () => {
      expect(action.type).to.equal('SELECT_BLOG');
    });
  });

  describe('fetch', () => {
    const user = {
      blogs: () => Promise.resolve([{ name: 'snake oil' }])
    };
    const action = actions.fetch(user);

    it('has FETCH_BLOGS type', () =>
      expect(action.payload).eventually.to.deep.equal([{
        name: 'snake oil'
      }]));

    it('has FETCH_BLOGS type', () => {
      expect(action.type).to.equal('FETCH_BLOGS');
    });
  });
});
