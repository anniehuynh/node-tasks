'use strict';
const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

//4 Add cat routes which respond to POST, PUT and DELETE methods
app.get('/cat', (req, res) => {
  res.send('From this endpoint you can get cats.')
});

//usually app.get should be put together
app.put('/cat', (req, res) => {
  res.send('With this endpoint you can edit cats.')
});

app.post('/cat', (req, res) => {
  res.send('With this endpoint you can add cats.')
});

app.delete('/cat', (req, res) => {
  res.send('With this endpoint you can delete cats.')
});

//5 Route parameters
app.get('/cat/:catId', (req, res) => {
  console.log('/cat route', req.params);
  res.send(`You reqested a cat whose id is ${req.params.catId}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
