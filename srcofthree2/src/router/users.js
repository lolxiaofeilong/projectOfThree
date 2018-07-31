const db = require("../db/dbhelper.js");
const apiResult = require("../utils/apiResult");
const jwt = require("jsonwebtoken");
const ObjectID = require("mongodb").ObjectID;

module.exports = {
    register: (app) => {
        app.post("/login", async (req, res) => {
            let data = {
                name: req.body.username,
                password: req.body.password
            }
            try {
                let result = await db.mongodb.select("users", data);
                let secret = "datoken";
                let token;
                if (result.length > 0) {
                    token = jwt.sign({ name: req.body.username }, secret, {
                        "expiresIn": 60 * 60 * 24
                    })
                    res.send(apiResult(result.length > 0, token));
                } else {
                    res.send(apiResult(false));
                }
            } catch (error) {
                res.send(apiResult(false, error));
            }
        })
        app.post("/register", async (req, res) => {
            let data = {
                name: req.body.username,
                password: req.body.password,
            }
            let dataset = await db.mongodb.select("users", { name: req.body.username });
            if (dataset.length > 0) {
                res.send(apiResult(false, null, "user exists"));
            } else {
                let result = await db.mongodb.insert("users", data);
                res.send(apiResult(true, false));
            }
        })
        app.post("/changepwd", async (req, res) => {
            let query = {
                name: req.body.username,
                password: req.body.password,
                newpwd: req.body.newpwd
            }
            let dataset = await db.mongodb.select("users", { name: req.body.username, password: req.body.password });
            if (dataset.length > 0) {
                dataset[0].password = query.newpwd;
                let _id = new ObjectID(dataset[0]["_id"]);
                let result = await db.mong-- - odb.update("users", { _id }, dataset[0]);
                res.send(apiResult(true, result));
            }
        })
    }
}