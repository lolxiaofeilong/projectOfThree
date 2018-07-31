const express = require ('express');
const bparser = require('body-parser');
const path = require('path');
const url = require('url')
const jwt = require('jsonwebtoken');
const apiResult = require('../utils/apiResult.js')

const app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,auth");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});

app.use(bparser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'../../')));

const filterList = ['/login','/changepwd']

// app.use((req,res,next)=>{
//     let pathname = url.parse(req.url,true).pathname;
//     if(filterList.includes(pathname)){
//         next();
//     }else{
        
//         let token =req.headers['auth'];

//         if(!token){
//             res.send(apiResult(false,null,'Token empty!'));
//         }else{
//             jwt.verify(token,'dktoken',async (err,result)=>{
//                 if(err){
//                     res.send(apiResult(false,err))
//                 }else{
//                     next();
//                 }
//             })
//         }
//     }
// });
const Product = require('./ProductRouter.js')
const admin = require('./adminRoute.js')
const goods = require('./goodsRoute.js')

module.exports = {

    start:(_port) =>{
        
        Product.Product(app),
        admin.register(app),
        goods.register(app),
        app.listen(_port || 66)
    }
}