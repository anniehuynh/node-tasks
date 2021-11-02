'use strict';
// userController

//calling object destructoring to import only users array in userModel
const { users, getUser } = require('../models/userModel');



const user_list_get = (req,res) => {
    users.forEach((user) => {
        delete user.password;
    });
    res.json(users); //always need to response something for all requests
};

const user_get = (req, res) => {
    const user = getUser(req.params.userId);
    //extra: delete password poperty from user's data before sending.
    delete user.password;
    res.json({user});
};

const user_post = (req, res) => {
    console.log('add user data', req.body);
    res.send('With this endpoint you can add users.')
};
//export
module.exports = {
    user_list_get, 
    user_get,
    user_post,
};