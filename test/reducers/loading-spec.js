import reducer from 'reducers/loading';
import { expect } from 'chai';

describe('loading reducer', () =>{
  describe('START_reducer', () => {
    it('adds field', () => {
      const next = reducer({}, { type: 'START_LOADING', payload: 'foo' });
      expect(next).to.deep.equal({ foo: true })
    });
  });

  [
    ['AUTHORIZE', 'authorize'],
    ['FETCH', 'fetch'],
    ['FETCH_BLOGS', 'fetch'],
    ['POST', 'post'],
    ['EDIT', 'post']
  ].forEach(([action, field]) => {
    it(`resets ${field} by ${action}`, () => {
      const next = reducer({ [field]: true }, { type: action });
      expect(next).to.deep.equal({ [field]: false });
    });
  });
});
