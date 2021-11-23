'use strict';
// userRoute
const express = require('express');
const { body } = require('express-validator');

const {
    user_list_get,
    user_get,
    user_post,
    user_delete,
    user_update,
    checkToken,
} = require('../controllers/userController.js'); //import from userController
const router = express.Router(); //Router is the object handle
//instead of /user, just / because it is already replaced by the router

router.route('/')
    .get(user_list_get)
    .post(
        body('name').isLength({ min: 3 }),
        body('email').isEmail(),
        body('passwd').matches('(?=.*[A-Z]).{8,}'),
        user_post
        )
    .put(
        body('name').isLength({ min: 3 }),
        body('email').isEmail(),
        body('passwd').matches('(?=.*[A-Z]).{8,}'),
        user_update);

       


router.route('/:userId')
    .get(user_get)
    .delete(user_delete);

router.get('/token', checkToken);
//make router available for other files
module.exports = router;
