'use strict';
// catRoute
const express = require('express');
//third party middleware multer import
const multer = require('multer');
//set up multer to send file uploaded to upload/ or create if does not exist
const upload = multer({ dest: './uploads/' });
const {
    cat_list_get,
    cat_get,
    cat_post,
    cat_delete,
    cat_update,
} = require('../controllers/catController.js'); //import from catController
const router = express.Router(); //Router is the object handle

router.route('/')
    .get(cat_list_get)
    .post(upload.single('cat'), cat_post)
    .put(cat_update);

router.route('/:catId')
    .get(cat_get)
    .delete(cat_delete);

//make router available for other files
module.exports = router;
