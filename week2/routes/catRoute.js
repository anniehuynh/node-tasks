'use strict';
// catRoute
const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ dest: './uploads/', fileFilter });
const {
  cat_list_get,
  cat_get,
  cat_post,
  cat_delete,
  cat_update,
} = require('../controllers/catController');
const router = express.Router();

router
  .route('/')
  .get(cat_list_get)
  .post(
    upload.single('cat'),
    body('name').notEmpty(),
    body('birthdate').isDate(),
    body('weight').isNumeric(),
    cat_post
  );

router
  .route('/:catId')
  .get(cat_get)
  .delete(cat_delete)
  .put(
    body('name').notEmpty(),
    body('birthdate').isDate(),
    body('weight').isNumeric(),
    cat_update
  );

router.route('/').get(cat_list_get).post(
  upload.single('cat'),
  body('name').notEmpty(),
  body('birthdate').isDate(),
  body('weight').isNumeric(),
  // #remove for ui3# body('owner').isNumeric(),
  cat_post
);

router.route('/:catId').get(cat_get).delete(cat_delete).put(
  body('name').notEmpty(),
  body('birthdate').isDate(),
  body('weight').isNumeric(),
  // #remove for ui3# body('owner').isNumeric(),
  cat_update
);

module.exports = router;
