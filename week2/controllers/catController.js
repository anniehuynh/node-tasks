'use strict';
// catController

//calling object destructoring to import only cats array in catModel
const { getAllCats, getCat, insertCat, deleteCat, updateCat } = require('../models/catModel');
const { get } = require('../routes/catRoute');
const { httpError } = require('../utils/errors');
const { validationResult } = require('express-validator');

const cat_list_get = async (req, res, next) => {
    const cats = await getAllCats();
    console.log('all cats', cats);
    if (cats.length > 0) {
        res.json(cats);
        return;
    } 
        const err = httpError('Cat not found', 404);
        next(err);
};

const cat_get = async (req, res, next) => {
    const cat = await getCat(req.params.catId, next);
    if (cat) {
        res.json(cat);
        return;
    }
    const err = httpError('Cat not found', 404);
    next(cat);

};

const cat_post = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.error('cat post validation', errors.array());
        const err = httpError('data not valid', 400);
        next(err);
        return;
    }
    
    console.log('add cat data', req.body);
    console.log('filename', req.file);
        if(!req.file){
            const err = httpError('Invalid file', 400);
            next(err);
            return;
        }
    const cat = req.body;
    cat.filename = req.file.filename;
    const id = await insertCat(cat, next);
    if(cat){
    res.json({ message: `cat added with id: ${id}`, cat_id: id });
    return;
    }
    const err = httpError('Bad request', 400);
    next(cat);
};

const cat_update = async (req, res) => {
    const updated = await updateCat(req.body);
    //console.log('cat_update',req.body);
    if(cat){
        res.json({ message: `Cat updated ${updated}`, cat_id: updated });
        return;
        }
        const err = httpError('Bad request', 400);
        next(cat);
};

const cat_delete = async (req, res) => {
    const deleted = await deleteCat(req.params.catId);
    if(cat){
        res.json({ message: `Cat deleted: ${deleted}`, cat_id: deleted });
        return;
        }
        const err = httpError('Bad request', 400);
        next(cat);
};

//export
module.exports = {
    cat_list_get,
    cat_get,
    cat_post,
    cat_update,
    cat_delete,
};