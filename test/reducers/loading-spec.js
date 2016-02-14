import reducer from 'reducers/loading';
import { expect } from 'chai';

describe('loading reducer', () =>{
  describe('START_reducer', () => {
    it('adds field', () => {
      const x = reducer({}, { type: 'START_LOADING', payload: 'foo' });
      expect(x).to.deep.equal({ foo: true })
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
      const x = reducer({ [field]: true }, { type: action });
      expect(x).to.deep.equal({ [field]: false });
    });
  });
});
