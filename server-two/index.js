'use strict'

const express = require('express');
const app = express(); // having an express application to start listening to request
const port = 3000;

//first Installing pug and then need to tell the app to use the view engine  to be pug
app.set('view engine', 'pug');
//give the name of the folder public to serve the static content html css
app.use(express.static('public'))

//(link to line 8) provide route to (all) the file with pug extender and transfer it to html format
app.get('/', (req, res) => {
  res.render('index');
});
/*
app.get('/', (req, res) => {
  res.render('index', {title: 'Title', pageheading: 'Click on the Cat});
});
*/

//get page 2 with pug layout
app.get('/page2', (req, res) => {
  res.render('page2', { title: 'Title - Page 2', pageheading: 'This is page 2', page2heading: 'Some extra' });
});

//anseer from the root of server
app.get('/hello', (req, res) => { //request and what the server will response
  res.send('Hello World!'); // sending back the response with text Hello World
});


//give response of cat.json in /catinfo
app.get('/catinfo', (req, res) => {
  const cat = {
    name: 'Frank',
    birthdate: '2010-12-25',
    weight: 5,
  };
  res.json(cat);
});

//listen to request
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


