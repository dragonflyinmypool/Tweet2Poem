const express = require('express');
require('dotenv').config();

// Start express
const app = express();

app.get('/webhook', (req, res) => {
  console.log('Server received a request on /webhook');
  res.send('You are visiting /webhook ' + process.env.MESSAGE);
});

app.listen(3000);
console.log('Server is listening for requests');
