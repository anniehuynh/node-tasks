'use strict';
const pool = require('../database/db');
const { param } = require('../routes/userRoute');
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
  if(cat.role === 0)
  try {
    const [rows] = await promisePool.execute('INSERT INTO wop_cat (name, weight, owner, birthdate, filename) VALUES (?, ?, ?, ?, ?)', 
    [cat.name, cat.weight, cat.owner, cat.birthdate, cat.filename]);
    //console.log('model insert cat', rows);
    return rows.insertId;
  } catch (e) {
    console.error('model insert cat', e.message);
  }
};

const deleteCat = async (id, user_id, role) => {
  let sql = 'DELETE wop_cat WHERE cat_id = ? AND owner = ?';
  let params = [cat.id, user_id];
  if (role === 0){
    sql = 'DELETE FROM wop_cat WHERE cat_id = ?';
    params =[catId]
  } 
    try {
      const [rows] = await promisePool.execute(sql, params);
      return rows.affectedRows === 1;
    } catch (e) {
      console.error('error', e.message);
    }
  
};

const updateCat = async (id, cat, user) => {
  let sql = 'UPDATE wop_cat SET name = ?, weight = ?, birthdate = ? WHERE cat_id = ? AND owner = ?';
  let params = [cat.name, cat.weight, cat.birthdate, cat.id, cat.owner];
  if (cat.role === 0) {
    sql = 'UPDATE wop_cat SET name = ?, weight = ?, owner = ?, birthdate = ? WHERE cat_id = ?';
    params = [cat.name, cat.weight, cat.owner, cat.birthdate, cat.id];
  }
  
  if (user.role === 0) {
    try {    
      const [rows] = await promisePool.execute(sql, params);
      return rows.affectedRows === 1;
    } catch (e) {
      console.error('error', e.message);
    }
  } else {
    try {
      const [rows] = await promisePool.execute('UPDATE wop_cat SET name = ?, weight = ?, birthdate = ? WHERE cat_id = ? AND owner = ?', [cat.name, cat.weight, date, id, user.user_id]);
      return rows;
    } catch (e) {
      console.error('error', e.message);
    }
  }
};

module.exports = {
  getCat,
  getAllCats,
  insertCat,
  updateCat,
  deleteCat,
};
