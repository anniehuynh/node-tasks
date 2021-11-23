'use strict';
const { validationResult } = require('express-validator');
// catController
const {
  getAllCats,
  getCat,
  insertCat,
  deleteCat,
  updateCat,
} = require('../models/catModel');
const { httpError } = require('../utils/errors');
const { getCoordinates } = require('../utils/imageMeta');
const { makeThumbnail } = require('../utils/resize');

const cat_list_get = async (req, res) => {
  const cats = await getAllCats();
  console.log('all cats', cats);
  if (cats.length > 0) {
    res.json(cats);
    return;
  }
  const err = httpError('Cats not found', 404);
  next(err);
};

const cat_get = async (req, res, next) => {
  const cat = await getCat(req.params.catId, next);
  if (cat) {
    res.json(cat);
    return;
  }
  const err = httpError('Cat not found', 404);
  next(err);
};

const cat_post = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('cat post validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }

  console.log('add cat data', req.body, req.user);
  console.log('filename', req.file);
  if (!req.file) {
    const err = httpError('Invalid file', 400);
    next(err);
    return;
  }

  try {
    const coords = await getCoordinates(req.file.path);
    console.log('coords', coords);
    req.body.coords = JSON.stringify(coords);
  } catch (e) {
    req.body.coords = '[0,0]';
  }

  try {
    const thumb = await makeThumbnail(req.file.path, req.file.filename);
    const cat = req.body;
    cat.filename = req.file.filename;
    cat.owner = req.user.user_id;
    const id = await insertCat(cat);
    if (thumb) {
      res.json({ message: `Cat created with id: ${id}`, cat_id: id });
    }
  } catch (e) {
    console.log('cat_post error', e.message);
    const err = httpError('Error uploading cat', 400);
    next(err);
    return;
  }
};

const cat_delete = async (req, res) => {
  const deleted = await deleteCat(
    req.params.catId,
    req.user.user_id,
    req.user.role
  );
  res.json({ message: `Cat deleted: ${deleted}` });
};

const cat_update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('cat_put validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }
  req.body.id = req.params.catId;
  req.body.owner = req.body.owner || req.user.user_id;
  req.body.role = req.user.role;
  console.log('cat_update', req.body);
  const updated = await updateCat(req.body);
  res.json({ message: `Cat updated: ${updated}` });
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_delete,
  cat_update,
};
