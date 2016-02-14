import reducer from 'reducers/blogs';
import { expect } from 'chai';

describe('blogs', () =>{
  const blogs = [
    { name: 'foo', title: 'foo', selected: false },
    { name: 'bar', title: 'bar', selected: false },
    { name: 'baz', ttile: 'baz', selected: true }
  ];

  describe('SELECT_BLOG', () => {
    let x = reducer(blogs, { type: 'SELECT_BLOG', payload: { name: 'bar' }});
    expect(x).to.deep.equal([
      { name: 'foo', title: 'foo', selected: false },
      { name: 'bar', title: 'bar', selected: true },
      { name: 'baz', ttile: 'baz', selected: false }
    ]);
  });

  describe('FETCH_BLOGS', () => {
    context('selected', () => {
      it('reserves selected', () => {
        let x = reducer(blogs, { type: 'FETCH_BLOGS', payload: [
          { name: 'foo', title: 'Foo' },
          { name: 'bar', title: 'Bar' },
          { name: 'baz', title: 'Baz' }
        ]});

        expect(x).to.deep.equal([
            { name: 'foo', title: 'Foo', selected: false },
            { name: 'bar', title: 'Bar', selected: false },
            { name: 'baz', title: 'Baz', selected: true }
        ]);
      });
    });

    context('not selected', () => {
      const blogs = [
        { name: 'foo', title: 'foo', selected: false },
        { name: 'bar', title: 'bar', selected: false },
        { name: 'baz', ttile: 'baz', selected: false}
      ];

      it('reserves selected', () => {
        let x = reducer(blogs, { type: 'FETCH_BLOGS', payload: [
          { name: 'foo', title: 'Foo' },
          { name: 'bar', title: 'Bar' },
          { name: 'baz', title: 'Baz' }
        ]});

        expect(x).to.deep.equal([
            { name: 'foo', title: 'Foo', selected: true },
            { name: 'bar', title: 'Bar', selected: false },
            { name: 'baz', title: 'Baz', selected: false }
        ]);
      });
    });
  });

  describe('LOGOUT', () => {
    it('reset blogs', () => {
      expect(reducer(blogs, { type: 'LOGOUT' })).to.deep.equal([]);
    });
  });
});
