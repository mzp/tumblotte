import { Blog as TumblrBlog, User as TumblrUser } from 'tumblr';
import { OAuth } from 'oauth';

const oauth = {
  consumer_key: 'l0SabDhlXku2L1Rde6bkRyb7E7UpLp00w6bdL5wOVdYHcdG4Mf',
  consumer_secret: '8gVZ9CbAdWOQ1MJ2e6fYmo3DhEeliRnSyqrbhFOGoLV5dRBsbq'
};

const consumer = new OAuth(
  "https://www.tumblr.com/oauth/request_token",
  "https://www.tumblr.com/oauth/access_token",
  oauth.consumer_key,
  oauth.consumer_secret,
  "1.0A",
  "https://mzp.jp",
  "HMAC-SHA1"
);

export default class Tumblr {
  static getRequestToken() {
    return new Promise((resolve, reject) => {
      consumer.getOAuthRequestToken((error, requestToken, requestTokenSecret)=> {
        if (error) {
          reject(error);
        } else {
          resolve({
            authorizeUrl: "https://www.tumblr.com/oauth/authorize?oauth_token=" + requestToken,
            requestToken,
            requestTokenSecret
          });
        }
      });
    });
  }

  static getAccessToken(requestToken, requestTokenSecret, oauthVerifier) {
    return new Promise((resolve, reject) => {
      consumer.getOAuthAccessToken(requestToken,
          requestTokenSecret, oauthVerifier, (error, accessToken, accessTokenSecret) => {
            if(error) {
              reject(error);
            } else {
              resolve({ accessToken, accessTokenSecret });
            }
          });
    });
  }
}

export class User {
  constructor(accessToken, accessTokenSecret) {
    this.user = new TumblrUser({
      consumer_key: oauth.consumer_key,
      consumer_secret: oauth.consumer_secret,
      token: accessToken,
      token_secret: accessTokenSecret
    });
  }

  blogs() {
    return new Promise((resolve, reject) => {
      this.user.info((error, response) => {
        if(error) {
          reject(error);
        } else {
          resolve(response.user.blogs);
        }
      });
    });
  }
}

export class Blog {
  constructor(name, accessToken, accessTokenSecret) {
    this.name = name;
    this.blog = new TumblrBlog(this.host, {
      consumer_key: oauth.consumer_key,
      consumer_secret: oauth.consumer_secret,
      token: accessToken,
      token_secret: accessTokenSecret
    });
  }

  create(title, body) {
    const opts = {
      type: 'text',
      state: 'published',
      format: 'markdown',
      title,
      body
    };

    return new Promise((resolve, reject) => {
      this.blog.post(opts, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  edit(id, title, body) {
    const opts = {
      type: 'text',
      state: 'published',
      format: 'markdown',
      id, title, body
    };

    return new Promise((resolve, reject) => {
      this.blog.edit(opts, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  fetchLast() {
    return this.fetch(1).then((xs) => Promise.resolve(xs[0]));
  }

  fetch(limit) {
    return new Promise((resolve, reject) => {
      this.blog.text({ filter: 'raw', limit }, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.posts);
        }
      });
    });
  }

  url(tumblrId) {
    return `https://${this.host}/post/${tumblrId}`
  }

  get host() {
    return `${this.name}.tumblr.com`;
  }
}
