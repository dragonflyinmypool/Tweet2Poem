// Require the Express web framework and body-parser
const express = require("express");
const bodyParser = require("body-parser");

const consumer_secret = "fk0aDawb9eBCY0IwBpWFBOZZeWHyPSpU1UqaHM927c5DhJbcXj";

// Create a new Express application
const app = express();

// Configure our Express application to parse incoming JSON
app.use(bodyParser.json());

// Create a route for our webhook
app.post("/webhook", (request, response) => {
  // Retrieve the request body
  const { body } = request;

  // Execute the webhook logic
  console.log("Webhook worked!");
  // Return a response
  response.json({
    success: true,
    message: "Webhook executed successfully!",
  });
});

// For hosted testing
// Start the Express application
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0");

// For local testing
// app.listen(8080);
