const express = require("express");
const app = express();

const { get_challenge_response } = require("./crc.js");

// This is the Consumer Secret for your app
const consumer_secret = "fk0aDawb9eBCY0IwBpWFBOZZeWHyPSpU1UqaHM927c5DhJbcXj";

// GET request for challenge-response check
app.get("/webhook", (req, res) => {
  const crc_token = req.query.crc_token;

  // Calculate the response token
  const response_token = get_challenge_response(crc_token, consumer_secret);

  // Create the response in JSON format
  const response = {
    response_token: `sha256=${response_token}`,
  };
  const axios = require("axios");

  let url = "https://api.twitter.com/1.1/account_activity/webhooks.json";
  let params = {
    url: "https://twithook.up.railway.app/webhook",
  };
  let authorization = {
    oauth_consumer_key: "mHVi5kfGfWtIwap7khW8Stmq1",
    oauth_nonce: "GENERATED",
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: "GENERATED",
    oauth_token: "ACCESS_TOKEN",
    oauth_version: "1.0",
  };

  axios
    .request({
      method: "post",
      url:
        url +
        "?oauth_consumer_key=" +
        authorization.oauth_consumer_key +
        "&oauth_nonce=" +
        authorization.oauth_nonce +
        "&oauth_signature_method=" +
        authorization.oauth_signature_method +
        "&oauth_timestamp=" +
        authorization.oauth_timestamp +
        "&oauth_token=" +
        authorization.oauth_token +
        "&oauth_version=" +
        authorization.oauth_version,
      data: params,
    })
    .then((response) => {
      console.log(response.statusCode);
      console.log(response.headers);
      console.log(response.body);
    })
    .catch((error) => {
      console.log("-- Error Found --");
      throw error;
    });
  console.log("server pinged");
  // Respond with 200 status code and the response token
  res.status(200).json(response);
});

// PUT request for manually triggering challenge-response check
app.put("/webhook", (req, res) => {
  const crc_token = req.query.crc_token;

  // Calculate the response token
  const response_token = get_challenge_response(crc_token, consumer_secret);

  // Create the response in JSON format
  const response = {
    response_token: `sha256=${response_token}`,
  };

  // Respond with 200 status code and the response token
  res.status(200).json(response);
});

// Start the server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0");

// app.listen(3000);
