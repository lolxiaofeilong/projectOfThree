const db = require('../db/dbhelper.js');
const apiResult = require('../utils/apiResult.js')
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
    register: (app) =>{
        app.post('/login',async (req,res)=>{
            let data ={
                username:req.body.username,
                password:req.body.password
            }
            try{
                let result = await db.mongodb.select('admins', data);
                let secret = 'baolongtoken';
                let token;
                if(result.length > 0) {
                    let token = jwt.sign({username: req.body.username}, secret, {
                        'expiresIn': 60*60*24 // 设置过期时间, 24 小时
                    }) 
                    res.send(apiResult(result.length > 0, token));
                } else {
                    res.send(apiResult(false));
                }         
            }catch(error){
                console.log(error)
                res.send(apiResult(false, error));
            }
               
        })

        app.get('/users',async (req,res)=>{
            let data = await db.mongodb.select('admins');
            res.send(apiResult(true,data));
        })

        app.post('/adduser',async (req,res)=>{
            let data = {
                username: req.body.username,
                password: req.body.password,
                rank : req.body.rank
            }
            let datas = await db.mongodb.select('admins',{ username: req.body.username});
            if(datas.length>0){
                res.send(apiResult(false,null,'用户已存在'))
            }else{
                let result = await db.mongodb.insert('admins', data);
                res.send(apiResult(true,result));
            }
        })

        app.post('/changepwd',async(req,res)=>{
            let query = {
                username: req.body.username,
                password: req.body.password,
                newpwd:req.body.newpwd
            }
            let dataset = await db.mongodb.select('admins',{username:req.body.username,password: req.body.password});
            if(dataset.length>0){
                dataset[0].password = query.newpwd;
                let _id = new ObjectID(dataset[0]['_id']);
                let result = await db.mongodb.update('admins',{_id}, dataset[0]);
                res.send(apiResult(true,result));
            }else{
                res.send(apiResult(false,false));
            }
        })

        app.post('/delect',async (req,res)=>{
            let query = {
                username: req.body.username,
            }
            let dataset = await db.mongodb.select('admins',{username:req.body.username});
            if(dataset.length>0){
                let _id = new ObjectID(dataset[0]['_id']);
                let result = await db.mongodb.delete('admins',{_id});
                res.send(apiResult(true,result));
            }else{
                res.send(apiResult(false,false));
            }
        })
    }
}