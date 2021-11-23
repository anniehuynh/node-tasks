'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
//import router from catRoute.js to app.js, remmeber to define a path to file
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const { httpError } = require('./utils/errors');
const passport = require('./utils/pass');

//access permission
app.use(cors());

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(passport.initialize());

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}),catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

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
