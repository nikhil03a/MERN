const express = require('express');
const recordRoutes = express.Router();
const dbo = require('../db/conn.js');

const ObjectId = require('mongodb').ObjectId;


recordRoutes.route('/list').get(function(req,res){
    let db_connect = dbo.getDb();
    db_connect.collection('list').find().toArray(function(err,result){
        if(err) throw err;
        res.json(result);
    });
});

recordRoutes.route('/add').post(function(req,res){
    let db_connect = dbo.getDb();
    const obj = {
        value: req.body.value
    }
    db_connect.collection('list').insertOne(obj,function(err,result){
        if(err) throw err;
        res.json(result);
    })
})
module.exports = recordRoutes