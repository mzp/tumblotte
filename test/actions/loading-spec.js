import actions from 'actions/loading'
import { expect } from 'chai';

describe('loading', () => {
  describe('start', () => {
    const action = actions.start();

    it('has START_LOADING type', () => {
      expect(action.type).to.equal('START_LOADING');
    });
  });
});
