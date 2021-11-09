'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
//import router from catRoute.js to app.js, remmeber to define a path to file
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const { httpError } = require('./utils/errors');

//access permission
app.use(cors());

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/cat', catRoute);
app.use('/user', userRoute);

app.use((req, res, next) => {
    const err = httpError('Not found', 404);
    next(err);
});

//error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'internal error' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
