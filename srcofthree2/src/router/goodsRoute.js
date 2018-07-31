const db = require('../db/dbhelper.js');
const apiResult = require('../utils/apiResult.js')
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
    register: (app) => {

        app.get('/goods_select', async (req, res) => {
            let data = await db.mongodb.select('goods');
            res.send(apiResult(true, data));
        })

        app.post('/goods_selectone', async (req, res) => {
            let query = {
                goodsID: req.body.goodsID,
            }
            let dataset = await db.mongodb.select('goods', { goodsID: req.body.goodsID });

            res.send(apiResult(true, dataset));

        })

        app.post('/goods_add', async (req, res) => {

            let data = {
                goodsID: req.body.goodsID,
                name: req.body.name,
                img: req.body.img,
                NowPrice: req.body.NowPrice,
                OldPrice: req.body.OldPrice,
                Gongxiao: req.body.Gongxiao,
                Model: req.body.Model,
                qty: req.body.qty,
            }
            let result = await db.mongodb.insert('goods', data);
            res.send(apiResult(true, result));
        })

        app.post('/goods_delect', async (req, res) => {
            let query = {
                goodsID: req.body.goodsID,
            }
            let dataset = await db.mongodb.select('goods', { goodsID: req.body.goodsID });
            if (dataset.length > 0) {
                let _id = new ObjectID(dataset[0]['_id']);
                let result = await db.mongodb.delete('goods', { _id });
                res.send(apiResult(true, result));
            } else {
                let result = await db.mongodb.delete('goods', {});
                res.send(apiResult(true, result));
            }
        })

        app.post('/goods_update', async (req, res) => {
            let query = {
                goodsID: req.body.goodsID,
                name: req.body.name,
                img: req.body.img,
                NowPrice: req.body.NowPrice,
                OldPrice: req.body.OldPrice,
                Gongxiao: req.body.Gongxiao,
                Model: req.body.Model,
                qty: req.body.qty,
            }
            let dataset = await db.mongodb.select('goods', { goodsID: req.body.goodsID });
            if (dataset.length > 0) {
                dataset[0].goodsID = query.goodsID;
                dataset[0].name = query.name;
                dataset[0].img = query.img;
                dataset[0].NowPrice = query.NowPrice;
                dataset[0].OldPrice = query.OldPrice;
                dataset[0].Gongxiao = query.Gongxiao;
                dataset[0].Model = query.Model;
                dataset[0].qty = query.qty;

                let _id = new ObjectID(dataset[0]['_id']);
                let result = await db.mongodb.update('goods', { _id }, dataset[0]);
                res.send(apiResult(true, result));
            } else {
                res.send(apiResult(false, false));
            }
        })

        //模糊搜索
        app.post('/searh_goods', async (request, res) => {

            let result = await db.mongodb.select("goods",
                {
                    $or: [{ goodsID: { $regex: request.body.info } },
                    { name: { $regex: request.body.info } },
                    { NowPrice: { $regex: request.body.info } },
                    { Gongxiao: { $regex: request.body.info } },
                    { Model: { $regex: request.body.info } },
                    { qty: { $regex: request.body.info } },
                    ]
                })
                
                res.send(apiResult(true, result));

        })

    }
}