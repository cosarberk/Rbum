"use strict";
var express = require('express');
var app = express();
var dotenv = require('dotenv');
var Rota = require('./router/rota');
var cors = require('cors');
var bodyParser = require('body-parser');
var ApiVersion = "v1";
dotenv.config();
var port = process.env.PORT;
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.get('/', function (req, res) {
    res.send("<pre>\n\n<h3> RBUM USER MANAGEMENT EXAMPLE NODE SERVER IS RUNNING\n--------------------------------------------------------\n| IP     : | localhost                                 |\n| PORT   : | ".concat(port, "                                      |\n| AUTHOR : | Berk CO\u015EAR - lookmainpoint@gmail.com      |\n--------------------------------------------------------\n<h3>\n</pre>  "));
});
//app.get('/Login/:user/:pass', Rota.Login)
app.post("/berkcosar/".concat(ApiVersion, "/Login"), Rota.Login);
// örnek 4 ana db işlemi gerçekleştirlim
//okuma
app.get("/berkcosar/".concat(ApiVersion, "/GetUser"), Rota.GetUser);
// kayıt
app.post("/berkcosar/".concat(ApiVersion, "/AddUser"), Rota.AddUser);
//Güncelleme
app.put("/berkcosar/".concat(ApiVersion, "/UpdateUser"), Rota.PutUser);
// silme
app.delete("/berkcosar/".concat(ApiVersion, "/DelUser"), Rota.DelUser);
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
