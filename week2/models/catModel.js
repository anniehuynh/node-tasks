'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getCat = async (catId) => {
  try{
  //TODO find single cat object from wop_cat table and return it
  const [rows] = await promisePool.execute(`SELECT * FROM wop_cat WHERE cat_id = ?`, [catId]);
  console.log('get by id result?', rows);
  return rows[0];//return first element in the list
  } catch (e){
    console.error('model get cat by id', e.message);
  }
};

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};


module.exports = {
  getCat,
  getAllCats
};
