'use strict';
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

const getUser = async (userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT user_id, name, email, role FROM wop_user WHERE user_id = ?',
      [userId]
    );
    console.log('get user by id result?', rows);
    return rows[0];
  } catch (e) {
    console.error('model get user by id', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query(
      'SELECT  user_id, name, email, role FROM wop_user'
    );
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const insertUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO wop_user (name, email, password, role) VALUES (?, ?, ?, ?)',
      [user.name, user.email, user.passwd, user.role ? user.role: 1]
    );
    console.log('model insert user', rows);
    return rows.insertId;
  } catch (e) {
    console.error('model insert user', e.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM wop_user WHERE user_id = ?',
      [userId]
    );
    console.log('model delete user', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model delete user', e.message);
  }
};

const updateUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
      'UPDATE wop_user SET name = ?, weight = ?, owner = ?, birthdate = ? WHERE user_id = ?',
      [user.name, user.weight, user.owner, user.birthdate, user.id]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model update user', e.message);
  }
};

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
      'SELECT * FROM wop_user WHERE email = ?;',
      params
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  insertUser,
  getAllUsers,
  getUserLogin,
};
