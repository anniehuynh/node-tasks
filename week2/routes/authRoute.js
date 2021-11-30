'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {login} = require('../controllers/authController');

router.post('/login', login);

router.post(
    '/register',
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('passwd').matches('(?=.*[A-Z]).{8,}'),
  );
  

module.exports = router;