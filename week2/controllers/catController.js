'use strict';
// catController

//calling object destructoring to import only cats array in catModel
const { getAllCats, getCat } = require('../models/catModel');
const { get } = require('../routes/catRoute');

const cat_list_get = async (req,res) => {
    const cats = await getAllCats();
    console.log('all cats', cats)
    res.json(cats); //always need to response something for all requests
};

const cat_get = (req, res) => {
    const cat = getCat(req.params.catId);
    res.json({cat});
};

const cat_post = (req, res) => {
    console.log('add cat data', req.body);
    res.send('With this endpoint you can add cats.')
};
//export
module.exports = {
    cat_list_get, 
    cat_get,
    cat_post,
};