const express = require('express');
require('dotenv').config();

// Start express
const app = express();

app.get('/webhook', (req, res) => {
  console.log('Server received a request on /webhook');
  res.send(`
  <section>
    <h3>Welcome to the API, the consumer key is: </h3>
    <pre>  
      <code>${process.env.TWITTER_CONSUMER_SECRET}</code>
    </pre>
    </section>
    <style>
    * {
      margin: 0;
      padding: 0;
    }
    html {
      background-color:black;
      color: white;
    }
    section {
      padding: 25px;
    }
    pre code {
      background-color: #eee;
      border: 1px solid #999;
      display: block;
      padding: 15px;
      color: black;
    }
    </style>
  `);
});

app.listen(3000);
console.log('Server is listening for requests');
