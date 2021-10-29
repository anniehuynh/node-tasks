'use strict'

const express = require('express');
const app = express(); // having an express application to start listening to request
const port = 3000;

//anseer from the root of server
app.get('/', (req, res)=> { //request and what the server will response
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