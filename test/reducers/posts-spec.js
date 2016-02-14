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

  describe('REMOVE', () => {
    const next = reducer([ new Post({ id: 42 })], {
      type: 'REMOVE',
      payload: { id: 42 }
    });

    it('removes post', () => {
      expect(next).to.be.empty;
    });
  });

  describe('SELECT', () => {
    const next = reducer([ new Post({ id: 42 }) ], {
      type: 'SELECT',
      payload: { id: 42 }
    });

    it('selects post', () => {
      expect(next[0]).to.include({ id: 42, selected: true });
    });
  });

  describe('CHANGE', () => {
    const post = new Post({ content: 'foo' });
    const next = reducer([post], {
      type: 'CHANGE',
      payload: {
        post,
        value: 'bar'
      }
    });

    it('changes content', () => {
      expect(next[0].content).to.equal('bar');
    });
  });

  describe('POST', () => {
    const post = new Post({ content: 'foo', dirty: true });
    const next = reducer([post], {
      type: 'POST',
      payload: { post, response: { id: 42 } }
    });
    it('updates post', () => {
      expect(next[0]).to.include({
        dirty: false,
        tumblrId: 42
      });
    });
  });

  describe('EDIT', () => {
    const post = new Post({ content: 'foo', dirty: true, tumblrId: 42 });
    const next = reducer([post], {
      type: 'EDIT',
      payload: { post, response: { } }
    });

    it('updates post', () => {
      expect(next[0]).to.include({
        dirty: false,
      });
    });
  });

  describe('FETCH', () => {
    const post = new Post({ content: 'foo', dirty: true, tumblrId: 42, selected: true });
    const next = reducer([post], {
      type: 'FETCH',
      payload: {
        blogName: 'snake',
        posts: [
          { id: 42, title: 'exist post', body: 'ya' },
          { id: 43, title: 'new post', body: 'yaya' }
        ]}});

    it('appends post', () => {
      expect(next.length).to.equal(2);
    });

    it('updates exist post', () => {
      expect(next[0]).to.include({
        tumblrId: 42,
        content: 'exist post\n\nya',
        dirty: false,
        selected: true
      });
    });

    it('adds new post', () => {
      expect(next[1]).to.include({
        tumblrId: 43,
        content: 'new post\n\nyaya',
        dirty: false,
        selected: false
      });
    });
  });
});
