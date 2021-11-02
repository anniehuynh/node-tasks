'use strict';
// userController

//calling object destructoring to import only users array in userModel
const { users, getUser } = require('../models/userModel');

const user_list_get = (req,res) => {
    res.json(users); //always need to response something for all requests
};

const user_get = (req, res) => {
    const user = getUser(req.params.userId);
    res.json({user});
};
//export
module.exports = {
    user_list_get, 
    user_get,
};