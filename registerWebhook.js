const axios = require('axios').default;

const crypto = require('crypto');

require('dotenv').config();

const CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;

// My app's webhook URL
const WEBHOOK_URL = 'https://twithook.up.railway.app/webhook/twitter';
const twitterRequestULR =
  'https://api.twitter.com/1.1/account_activity/webhooks.json';

async function createWebhook() {
  try {
    // Generate OAuth parameters
    const oauthNonce = Math.random().toString(36).substring(2);
    const oauthTimestamp = Math.floor(Date.now() / 1000);
    const oauthSignatureMethod = 'HMAC-SHA1';
    const oauthVersion = '2.0';

    // Build the base string for the OAuth signature
    const baseString = `POST&${encodeURIComponent(
      twitterRequestULR
    )}&${encodeURIComponent(
      `oauth_consumer_key=${CONSUMER_KEY}&oauth_nonce=${oauthNonce}&oauth_signature_method=${oauthSignatureMethod}&oauth_timestamp=${oauthTimestamp}&oauth_token=${ACCESS_TOKEN}&oauth_version=${oauthVersion}&url=${encodeURIComponent(
        WEBHOOK_URL
      )}`
    )}`;

    // Generate the OAuth signature
    // Replace `SECRET_KEY` with your own secret key
    const secretKey = process.env.TWITTER_CONSUMER_SECRET;
    const hash = crypto
      .createHmac('sha1', secretKey)
      .update(baseString)
      .digest('base64');
    const oauthSignature = encodeURIComponent(hash);

    // Build the Authorization header
    const authHeader = `OAuth oauth_consumer_key="${CONSUMER_KEY}", oauth_nonce="${oauthNonce}", oauth_signature="${oauthSignature}", oauth_signature_method="${oauthSignatureMethod}", oauth_timestamp="${oauthTimestamp}", oauth_token="${ACCESS_TOKEN}", oauth_version="${oauthVersion}"`;

    // Make the POST request to create the webhook
    const response = await axios.post(
      'https://api.twitter.com/1.1/account_activity/webhooks.json',
      { url: WEBHOOK_URL },
      { headers: { authorization: authHeader } }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

createWebhook();
