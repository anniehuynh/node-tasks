'use strict';
// catRoute
const express = require('express');
const { cat_list_get, cat_get } = require('../controllers/catController.js'); //import from catController
const router = express.Router(); //Router is the object handle

//instead of /cat, just / because it is already replaced by the router
//7
router.get('/', cat_list_get);

router.get('/:catId', cat_get);

router.put('/', (req, res) => {
    res.send('With this endpoint you can edit cats.')
});

router.post('/', (req, res) => {
    res.send('With this endpoint you can add cats.')
});

router.delete('/', (req, res) => {
    res.send('With this endpoint you can delete cats.')
});


  //make router available for other files
module.exports = router;
