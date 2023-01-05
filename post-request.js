//  RESGISTER WEBHOOK
//  This will register webhook by triggering a POST request to the webhook URL
//  with the crc_token and consumer secret and responding to the challenge.
//  This is the first file, all it will do is post request the twitter URL to trigger the challenge

const axios = require('axios');

// Replace these with your own Twitter API credentials, from .env
const CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Replace this with the URL of your webhook
const WEBHOOK_URL = 'https://twithook.up.railway.app/webhook/twitter';

async function createWebhook() {
  try {
    // Generate OAuth parameters
    const oauthNonce = Math.random().toString(36).substring(2);
    const oauthTimestamp = Math.floor(Date.now() / 1000);
    const oauthSignatureMethod = 'HMAC-SHA1';
    const oauthVersion = '1.0';

    // Build the base string for the OAuth signature
    const baseString = `POST&${encodeURIComponent(
      'https://api.twitter.com/1.1/account_activity/webhooks.json'
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
