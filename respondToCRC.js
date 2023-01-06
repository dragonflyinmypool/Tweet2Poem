const express = require('express');
require('dotenv').config();

// Get my consumer secret from the env file
const consumer_secret = process.env.TWITTER_CONSUMER_SECRET;

// Start express
const app = express();

app.get('/webhook', (req, res) => {
  console.log('Server received a request on /webhook');

  // Get the crc_token from twitter request
  const crc_token = req.query.crc_token;

  // Calculate the response token, based on the crc_token and consumer secret
  const response_token = calculate_response(crc_token, consumer_secret);

  // Format response
  const reponse = {
    response_token: `sha256=${response_token}`,
  };

  // Respond with 200 status code and the response token
  res.status(200).json(response);
});

calculate_response = function (crc_token, consumer_secret) {
  hmac = crypto
    .createHmac('sha256', consumer_secret)
    .update(crc_token)
    .digest('base64');

  console.log('crc_token: ' + crc_token);
  console.log('consumer_secret: ' + consumer_secret);
  console.log('hmac: ' + hmac);

  return hmac;
};

app.listen(3000);
console.log('Server is listening for requests');
