"use strict";
// catRoute
const express = require("express");

const { body } = require("express-validator");

//third party middleware multer import
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//set up multer to send file uploaded to upload/ or create if does not exist
const upload = multer({ dest: "./uploads/", fileFilter });
const {
  cat_list_get,
  cat_get,
  cat_post,
  cat_delete,
  cat_update,
} = require("../controllers/catController.js"); //import from catController
const router = express.Router(); //Router is the object handle

router
  .route("/")
  .get(cat_list_get)
  .post(
    upload.single("cat"),
    body("name").isLength({ min: 1 }),
    body("birthdate").isDate(),
    body("weight").isNumeric().isLength({ min: 1 }),
    cat_post
  )
 

router.route("/:catId")
    .get(cat_get)
    .put(cat_update)
    .delete(cat_delete)
    .put(
      body("name").isLength({ min: 1 }),
      body("birthdate").isDate(),
      body("weight").isNumeric().isLength({ min: 1 }),
      cat_update
    );

//make router available for other files
module.exports = router;
