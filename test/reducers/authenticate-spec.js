import reducer from 'reducers/authenticate';
import { expect } from 'chai';

describe('authenticate reducer', () => {
  const init = {};

  describe('INIT', () => {
    const state = {
      authorizeUrl: 'htpp://example.com',
      accessToken: 'access token'
    };

    [ '@@INIT', '@@redux/INIT'].forEach((type) => {
      describe(type, () => {
        const next = reducer(state, { type });
        it('forgets authorizeUrl', () => {
          expect(next.authorizeUrl).to.be.null;
        });

        it('preserves accessToken', () => {
          expect(next.accessToken).to.equal('access token');
        });
      });
    });
  });

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
      type: 'LOGOUT'
    });
    it('becomes empty', () => {
      expect(next.accessToken).to.be.undefined;
      expect(next.accessTokenSecret).to.be.undefined;
    });
  });
});

