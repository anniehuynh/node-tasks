'use strict';

const pool = require('../database/db');
const { user_post } = require('../controllers/userController');
const promisePool = pool.promise();

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(`SELECT * FROM wop_user WHERE user_id = ?`, [userId]);
    console.log('get by id result?', rows);
    return rows[0];//return first element in the list
  } catch (e) {
    console.error('model get user by id', e.message);
  }
};

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const insertUser = async (user) => {
  try {
    const [rows] = await promisePool.execute('INSERT INTO wop_user (name, email, password, role) VALUES (?, ?, ?, ?)', [user.name, user.email,  user.password, user.role]);
    console.log('model insert user', rows);
    return rows.insertId;
  } catch (e) {
    console.error('model insert user', e.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute('DELETE FROM wop_user WHERE user_id = ?', [userId]);
    console.log('model delete user', rows);
    return rows.affectedRows === 1; //how many rows are affected resulting from deleting a cat from db sql
  } catch (e) {
    console.error('model delete user', e.message);
  };
};

const updateUser = async (user) => {
  try {
    console.log('start updating user');
    const [rows] = await promisePool.execute('UPDATE wop_user SET name = ?, email = ?, password = ?, role = ? WHERE user_id = ?', [user.name, user.email, user.password, user.role, user.user_id]);
    console.log('model update user', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model update user', e.message);
  };
};
module.exports = {
  getUser,
  getAllUsers,
  insertUser,
  deleteUser,
  updateUser,
  getUserLogin,
};
