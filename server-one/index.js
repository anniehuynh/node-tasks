'use strict'

const express = require('express');
const app = express(); // having an express application to start listening to request
const port = 3000;

//anseer from the root of server
app.get('/', (req, res)=> { //request and what the server will response
    res.send('Hello World!'); // sending back the response with text Hello World
  });

//listen to request
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
/* nodemon run the app on local host with the updated changes */