import actions from 'actions/authenticate'
import { expect } from 'chai';
import { stub } from 'sinon';
import Tumblr from 'gateway/tumblr';

describe('authenticate', () => {
  describe('authorize', () => {
    let getRequestToken = stub();
    Tumblr.getRequestToken = getRequestToken;
    getRequestToken.returns(Promise.resolve('request token'));

    const action = actions.authorize();

    it('has AUTHORIZE type', () => {
      expect(action.type).to.equal('AUTHORIZE');
    });

    it('has request token', () => {
      return expect(action.payload).eventually.to.equal('request token');
    });
  });

  describe('getAccessToken', () => {
    let getAccessToken = stub();
    Tumblr.getAccessToken = getAccessToken;
    getAccessToken
      .withArgs('request token', 'request token secret', 'verifier')
      .returns(Promise.resolve('access token'));

    const action = actions.getAccessToken('request token', 'request token secret', 'verifier');

    it('has AUTHORIZE type', () => {
      expect(action.type).to.equal('ACCESS_TOKEN');
    });

    it('has request token', () => {
      return expect(action.payload).eventually.to.equal('access token');
    });
  });

  describe('logout', () => {
    const action = actions.logout();

    it('has LOGOUT type', () => {
      expect(action.type).to.equal('LOGOUT');
    });
  });
});
