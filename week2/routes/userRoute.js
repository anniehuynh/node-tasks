'use strict';
// userRoute
const express = require('express');
const { 
    user_list_get, 
    user_get, 
    user_post 
} = require('../controllers/userController.js'); //import from userController
const router = express.Router(); //Router is the object handle

//instead of /user, just / because it is already replaced by the router
//7
router.get('/', user_list_get);

router.get('/:userId', user_get);

router.post('/', user_post);

router.put('/', (req, res) => {
    res.send('With this endpoint you can edit users.')
});

router.post('/', (req, res) => {
    console.log('add user data', req.body);
    res.send('With this endpoint you can add users.')
});

router.delete('/', (req, res) => {
    res.send('With this endpoint you can delete users.')
});


//make router available for other files
module.exports = router;
