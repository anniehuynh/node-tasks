'use strict';
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

const getCat = async (catId, next) => {
  try {
    //Avoid direct string injection to the query
    const [rows] = await promisePool.execute(
      ' SELECT cat_id, owner, wop_cat.name AS name, weight, birthdate, filename,' +
      'wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = user_id WHERE cat_id = ?',
      [catId]
    );
    return rows[0];
  } catch (e) {
    console.log("Error", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
};

const getAllCats = async (next) => {
  try {
    const [rows] = await promisePool.query
    ('SELECT cat_id, owner, wop_cat.name AS name, weight, birthdate, filename,' +
    'wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = user_id');
    //console.log(rows)
    return rows;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
};

const insertCat = async (cat,next) => {
  try {
    const [rows] = await promisePool.execute('INSERT INTO wop_cat (name, weight, owner, birthdate, filename) VALUES (?, ?, ?, ?, ?)', 
    [cat.name, cat.weight, cat.owner, cat.birthdate, cat.filename]);
    //console.log('model insert cat', rows);
    return rows.insertId;
  } catch (e) {
    console.error('model insert cat', e.message);
  }
};

const deleteCat = async (catId) => {
  try {
    const [rows] = await promisePool.execute('DELETE FROM wop_cat WHERE cat_id = ?', [catId]);
    console.log('model delete cat', rows);
    return rows.affectedRows === 1; //how many rows are affected resulting from deleting a cat from db sql
  } catch (e) {
    console.error('model delete cat', e.message);
  };
};

const updateCat = async (cat) => {
  try {
    console.log('start update');
    const [rows] = await promisePool.execute('UPDATE wop_cat SET name = ?, weight = ?, owner = ?, birthdate = ? WHERE cat_id = ?', [cat.name, cat.weight, cat.owner, cat.birthdate, cat.id]);
    console.log('model update cat', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model update cat', e.message);
  };
};
module.exports = {
  getCat,
  getAllCats,
  insertCat,
  updateCat,
  deleteCat,
};
