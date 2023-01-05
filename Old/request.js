const axios = require('axios');

let url = 'https://api.twitter.com/1.1/account_activity/webhooks.json';
let params = {
  url: 'https://twithook.up.railway.app/webhook',
};

let authorization = {
  oauth_consumer_key: process.env.CONSUMER_KEY,
  oauth_nonce: 'GENERATED',
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: 'GENERATED',
  oauth_token: 'ACCESS_TOKEN',
  oauth_version: '1.0',
};

axios
  .request({
    method: 'post',
    url:
      url +
      '?oauth_consumer_key=' +
      authorization.oauth_consumer_key +
      '&oauth_nonce=' +
      authorization.oauth_nonce +
      '&oauth_signature_method=' +
      authorization.oauth_signature_method +
      '&oauth_timestamp=' +
      authorization.oauth_timestamp +
      '&oauth_token=' +
      authorization.oauth_token +
      '&oauth_version=' +
      authorization.oauth_version,
    data: params,
  })
  .then((response) => {
    console.log(response.statusCode);
    console.log(response.headers);
    console.log(response.body);
  })
  .catch((error) => {
    throw error;
  });
