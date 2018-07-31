const db = require('../db/dbhelper.js');
const apiResult = require('../utils/apiResult.js')
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
    Product: (app) =>{
        app.post('/List_select',async (req,res)=>{
            let data = await db.mongodb.select('users');
            res.send(apiResult(true,data));
        })


        app.post('/goods_select',async (req,res)=>{
            let query = {
                goodsID: req.body.goodsID,
            }
            let dataset = await db.mongodb.select('goods',{goodsID:req.body.goodsID});
            
            res.send(apiResult(true,dataset));
            
        })

        app.post('/changepwd',async(req,res)=>{
            let query = {
                name: req.body.username,
                password: req.body.password,
                newpwd:req.body.newpwd
            }
            let dataset = await db.mongodb.select('users',{name:req.body.username,password: req.body.password});
            if(dataset.length>0){
                dataset[0].password = query.newpwd;
                let _id = new ObjectID(dataset[0]['_id']);
                let result = await db.mongodb.update('users',{_id}, dataset[0]);
                res.send(apiResult(true,result));
            }else{
                res.send(apiResult(false,false));
            }
        })

        app.post('/delect',async (req,res)=>{
            let query = {
                name: req.body.username,
            }
            let dataset = await db.mongodb.select('users',{name:req.body.username});
            if(dataset.length>0){
                let _id = new ObjectID(dataset[0]['_id']);
                let result = await db.mongodb.delete('users',{_id});
                res.send(apiResult(true,result));
            }else{
                res.send(apiResult(false,false));
            }
        })
    }
}