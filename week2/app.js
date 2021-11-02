'use strict';
const express = require('express');
const app = express();
const port = 3000;
//import router from catRoute.js to app.js, remmeber to define a path to file
const catRoute = require('./routes/catRoute'); 
const userRoute = require('./routes/userRoute'); 


//6
app.use('/cat', catRoute);
app.use('/user', userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
