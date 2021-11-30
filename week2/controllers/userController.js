'use strict';
const { validationResult } = require('express-validator');
// userController
const { users, getUser, getAllUsers } = require('../models/userModel');
const { httpError } = require('../utils/errors');

const user_list_get = async (req, res) => {
  const users = await getAllUsers();
  console.log('all users', users);
  if (users.length > 0) {
    res.json(users);
    return;
  }
  const err = httpError('Users not found', 404);
  next(err);
};

const user_get = async (req, res, next) => {
  const user = await getUser(req.params.userId, next);
  if (user) {
    res.json(user);
    return;
  }
  const err = httpError('User not found', 404);
  next(err);
};


const checkToken = (req, res, next) => {
  console.log('checkToken', req.user);
  if (!req.user) {
    next(httpError('token not valid', 400));
  } else {
    res.json({ user: req.user });
  }
};

module.exports = {
  user_list_get,
  user_get,
  checkToken,
};
