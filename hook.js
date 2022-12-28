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
