import reducer from 'reducers/authenticate';
import Authenticate from 'values/Authenticate';
import { expect } from 'chai';

describe('authenticate reducer', () => {
  const init = new Authenticate({}).init();

  describe('AUTHORIZE', () => {
    const next = reducer(init, {
      type: 'AUTHORIZE',
      payload: {
        authorizeUrl: 'http://example.com',
        requestToken: 'request token',
        requestTokenSecret: 'request token secret'
      }
    });

    it('contains authorizeUrl', () => {
      expect(next.authorizeUrl).to.equal('http://example.com');
    });

    it('contains requestToken', () => {
      expect(next.requestToken).to.equal('request token');
    });

    it('contains requestTokenSecret', () => {
      expect(next.requestTokenSecret).to.equal('request token secret');
    });
  });

  describe('ACCESS_TOKEN', () => {
    const next = reducer(init, {
      type: 'ACCESS_TOKEN',
      payload: {
        accessToken: 'access token',
        accessTokenSecret: 'access token secret'
      }
    });

    it('contains accessToken', () => {
      expect(next.accessToken).to.equal('access token');
    });

    it('contains accessTokenSecret', () => {
      expect(next.accessTokenSecret).to.equal('access token secret');
    });
  });

  describe('LOGOUT', () => {
    const next = reducer({ accessToken: '', accessTokenSecret: '' }, {
      type: 'LOGOUT',
    });
    it('becomes empty', () => {
      expect(next.accessToken).to.be.undefined;
      expect(next.accessTokenSecret).to.be.undefined;
    });
  });
});

