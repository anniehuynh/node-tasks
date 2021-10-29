'use strict'

const express = require('express');
const app = express(); // having an express application to start listening to request
const port = 3000;

//give the name of the folder public to serve the static content html css
app.use(express.static('public'))

//anseer from the root of server
app.get('/hello', (req, res)=> { //request and what the server will response
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


