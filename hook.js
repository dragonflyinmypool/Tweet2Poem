// Require the Express web framework and body-parser
const express = require("express");
const bodyParser = require("body-parser");

// Create a new Express application
const app = express();

// Configure our Express application to parse incoming JSON
app.use(bodyParser.json());

// Create a route for our webhook
app.post("/webhook", (request, response) => {
  // Retrieve the request body
  const { body } = request;

  // Execute the webhook logic
  // ...
  console.log("Webhook worked!");
  // Return a response
  response.json({
    success: true,
    message: "Webhook executed successfully!",
  });
});

// Start the Express application
app.listen($PORT);
