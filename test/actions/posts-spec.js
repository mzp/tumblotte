import actions from 'actions/posts'
import { expect } from 'chai';
import { mock } from 'sinon';

describe('posts', () => {
  describe('create', () => {
    const action = actions.create();

    it('has CREATE type', () => {
      expect(action.type).to.equal('CREATE');
    });
  });

  describe('select', () => {
    const action = actions.select();

    it('has SELECT type', () => {
      expect(action.type).to.equal('SELECT');
    });
  });

  describe('change', () => {
    const action = actions.change();

    it('has CHANGE type', () => {
      expect(action.type).to.equal('CHANGE');
    });
  });

  describe('remove', () => {
    const action = actions.remove();

    it('has REMOVE type', () => {
      expect(action.type).to.equal('REMOVE');
    });
  });

  describe('post', () => {
    const tumblr = {
      create: () => { return Promise.resolve('') },
      fetchLast: () => { return Promise.resolve('<fetch response>') },
      edit: () => { return Promise.resolve('<edit response>') }
    };
    const post = { title: 'foo', body: 'bar' };
    const m = mock(tumblr);

    context('POST', () => {
      const action = actions.post(tumblr, post);
      it('has POST type', () => {
        const action = actions.post(tumblr, post);
        expect(action.type).to.equal('POST');
      });

      it('calls Tumblr#create', () => {
         m.expects("create").withArgs(post.title, post.body).returns(Promise.resolve(''));
         actions.post(tumblr, post);
         m.verify();
      });

      it('has response', () =>
        expect(action.payload).to.eventually.have.property(
          'response', '<fetch response>'));

      it('has post.title', () =>
        expect(action.payload).to.eventually.have.deep.property(
          'post.title', post.title));

      it('has post.body', () =>
        expect(action.payload).to.eventually.have.deep.property(
          'post.body', post.body));
   });

    context('UPDATE', () => {
      const action = actions.post(tumblr, { tumblrId: 42, ...post });

      it('has UPDATE type', () => {
        expect(action.type).to.equal('EDIT');
      });

      it('calls Tumblr#create', () => {
         m.expects("edit").withArgs(42, post.title, post.body).returns(Promise.resolve(''));
         actions.post(tumblr, { tumblrId: 42, ...post });
         m.verify();
      });

      it('has response', () =>
        expect(action.payload).to.eventually.have.property(
          'response', '<edit response>'));

      it('has post.title', () =>
        expect(action.payload).to.eventually.have.deep.property(
          'post.title', post.title));

      it('has post.body', () =>
        expect(action.payload).to.eventually.have.deep.property(
          'post.body', post.body));
    });
  });

  describe('fetch', () => {
    const tumblrBlog = {
      name: 'snake oil',
      fetch: () => {
        return Promise.resolve([
          { id:1, title: 'post 1' },
          { id:2, title: 'post 2' }
        ]);
      }
    };
    const action = actions.fetch(tumblrBlog, 10);

    it('has FETCH type', () => {
      expect(action.type).to.equal('FETCH');
    });

    it('call TumblrBlog#fetch', () => {
      const m = mock(tumblrBlog);
      m.expects("fetch").withArgs(10).returns(Promise.resolve(''));
      actions.fetch(tumblrBlog);
      m.verify();
    });

    it('has blogName', () =>
      expect(action.payload).eventually.to.have.property('blogName', 'snake oil'));

    it('has posts', () =>
      expect(action.payload)
        .eventually.to.have.property('posts')
        .that.deep.equals([
          { id: 1, title: 'post 1'},
          { id: 2, title: 'post 2'}
        ])
    );
  });
});
