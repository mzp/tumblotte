import reducer from 'reducers/posts';
import Post from 'values/Post';
import { expect } from 'chai';

describe('posts reducer', () => {
  describe('CREATE', () => {
    const next = reducer([], {
      type: 'CREATE',
      payload: { blogName: 'snake oil' }
    });

    it('creates new post', () => {
      expect(next.length).to.equal(1);
    });

    it('creates new post', () => {
      expect(next[0]).to.include({
        blogName: 'snake oil',
        dirty: true,
        selected: true
      });
    });
  });
});
