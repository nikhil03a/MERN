const express = require('express')

const recordRoutes = express.Router();

const dbo = require('../db/conn.js');

const ObjectId = require('mongodb').ObjectId;

recordRoutes.route('/record').get(function(req,res){
    let db_connect = dbo.getDb();
    db_connect.collection('records').find({}).toArray(function(err,result){
        if(err) throw err;
        res.json(result);
    });
});


recordRoutes.route('/record/:id').get(function(req,res){
    let db_connect = dbo.getDb();
    let myquery ={ _id: new ObjectId(req.params.id)};
    db_connect.collection('records')
    .findOne(myquery,function(err,result){
        if(err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/record/add").post(function(req,res){
    let db_connect = dbo.getDb();
    let myobj = {
        name:req.body.name,
        position: req.body.position,
        level: req.body.level
    };
    db_connect.collection('records').insertOne(myobj,function(err,result){
        if(err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/update/:id").post(function(req,res){
    let db_connect = dbo.getDb();
    let myquery = {_id: new ObjectId(req.params.id)};
    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        }
    };
    db_connect.collection('records')
    .updateOne(myquery,newvalues,function(err,result){
        if(err) throw err;
        res.json(result);
    });
});

recordRoutes.route('/:id').delete(function(req,res){
    let db_connect = dbo.getDb();
    let myquery = {_id: new ObjectId(req.params.id)};
    db_connect.collection('records').deleteOne(myquery,function(err,result){
        if(err) throw err;
        res.json(result);
    });
});

module.exports = recordRoutes;