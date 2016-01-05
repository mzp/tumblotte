export default class Authenticate {
  constructor({ accessToken, accessTokenSecret, authorizeUrl, requestToken, requestTokenSecret }) {
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    this.authorizeUrl = authorizeUrl;
    this.requestToken = requestToken;
    this.requestTokenSecret = requestTokenSecret;
  }

  init() {
    const { accessToken, accessTokenSecret } = this;
    return new Authenticate({ accessToken, accessTokenSecret });
  }

  authorize(authorizeUrl, requestToken, requestTokenSecret) {
    return new Authenticate({ ...this, authorizeUrl, requestToken, requestTokenSecret });
  }

  verify(accessToken, accessTokenSecret) {
    return new Authenticate({ ...this, accessToken, accessTokenSecret });
  }

  logout() {
    return new Authenticate({});
  }

  get isAuthenticated() {
    return !!this.accessToken
  }
}
