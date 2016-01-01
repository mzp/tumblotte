import { Blog } from 'tumblr';
import { OAuth } from 'oauth';
const shell = global.require('shell');

// TODO: remove me
const oauth = {
  consumer_key: 'l0SabDhlXku2L1Rde6bkRyb7E7UpLp00w6bdL5wOVdYHcdG4Mf',
  consumer_secret: '8gVZ9CbAdWOQ1MJ2e6fYmo3DhEeliRnSyqrbhFOGoLV5dRBsbq',
  token: 'AAHYKSeXfJYmgeHaghq7DsNcv5gAZgSvb1U65WNE7uiFZFx6UY',
  token_secret: 'Ssjdv04R1bmvdhpXvMZ1sN3AFSkQkAWdidDw4gf45UJQK6Q92u'
};

//OAuth用オブジェクト
const consumer = new OAuth(
  "https://www.tumblr.com/oauth/request_token",
  "https://www.tumblr.com/oauth/access_token",
  oauth.consumer_key,
  oauth.consumer_secret,
  "1.0A",
  "https://example.com",
  "HMAC-SHA1"
);

// TODO: custom me
const blog = new Blog('mzp-text.tumblr.com', oauth);

export function getRequestToken() {
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

export function getAccessToken(requestToken, requestTokenSecret, oauthVerifier) {
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

export function create(title, body) {
  const opts = {
    type: 'text',
    state: 'published',
    format: 'markdown',
    title,
    body
  };

  return new Promise((resolve, reject) => {
    blog.post(opts, (error, response) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve();
        }
    });
  });
}

export function edit(id, title, body) {
  const opts = {
    type: 'text',
    state: 'published',
    format: 'markdown',
    id,
    title,
    body
  };

  return new Promise((resolve, reject) => {
    blog.edit(opts, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
    });
  });
}

export function fetchLast() {
  return new Promise((resolve, reject) => {
    blog.text({ limit: 1 }, (error, response) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(response.posts[0]);
        }
    });
  });
}

export function fetch(limit) {
  return new Promise((resolve, reject) => {
    blog.text({ filter: 'raw', limit }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.posts);
      }
    });
  });
}

export function url(tumblrId) {
  return `https://mzp-text.tumblr.com/post/${tumblrId}`
}
