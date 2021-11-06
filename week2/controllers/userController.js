'use strict';
// userController

//calling object destructoring to import only users array in userModel
const { users, getAllUsers, getUser, insertUser, deleteUser, updateUser } = require('../models/userModel');

const user_list_get = async (req,res) => {
    const users = await getAllUsers();
     users.forEach((user) => {
        delete user.password;
    });
    res.json(users); 
};

const user_get = async(req, res) => {
    const user = await getUser(req.params.userId);
    delete user.password;  // password poperty from user's data before sending.
    res.json({user});
};

const user_post = async (req, res) => {
    console.log('add user data', req.body);
    const user = req.body;
    const id = await insertUser(user); 
    res.json({message: `user added with id: ${id}`});
};

const user_update = async (req, res) => {
    const updated = await updateUser(req.body);
    res.json({message: `User updated ${updated}`});
}

const user_delete = async (req, res) => {
    const deleted = await deleteUser(req.params.userId);
    res.json ({message: `User deleted: ${deleted}`});
};
//export
module.exports = {
    user_list_get, 
    user_get,
    user_post,
    user_update,
    user_delete,
};