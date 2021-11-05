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
} = require('../controllers/catController.js'); //import from catController
const router = express.Router(); //Router is the object handle

//instead of /cat, just / because it is already replaced by the router
//7
router.get('/', cat_list_get);

router.get('/:catId', cat_get);

//upload the file in name = 'cat'(check in view page source html form name)
router.post('/', upload.single('cat'), cat_post);


router.put('/', (req, res) => {
    res.send('With this endpoint you can edit cats.')
});

router.post('/', (req, res) => {
    res.send('With this endpoint you can add cats.')
});

router.delete('/:catId', cat_delete);


//make router available for other files
module.exports = router;
