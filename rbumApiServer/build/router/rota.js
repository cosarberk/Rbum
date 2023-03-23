"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rbum_1 = require("../rbum");
var Um = new rbum_1.Rbum();
var localDB_1 = require("../localDB/localDB");
var menudb = new localDB_1.MenuDB();
// Login işlemi
var Login = function (req, res) {
    var u = req.body.user, p = req.body.pass, T = Um.Login(u, p);
    res.send(T);
};
// jwt yi çözümler
var GetAuth = function (jwt) {
    return Um.ControlTemponaryJWT(jwt);
};
// çözülen jwtden kullanıcı id sini ve rolünü döner
var GetLevel = function (jwt) {
    var JWT = GetAuth(jwt);
    return { uid: JWT.id, role: JWT.role };
};
//const jwt = req.body.token || req.query.token || req.headers["x-access-token"];
//let jwt = req.headers.authorization.split(" ")[1] // split ile bölünüp Bearer tagını devredışı bırakılır
var GetUser = function (req, res) {
    res.send(menudb.SELECT(GetLevel(req.headers.authorization.split(" ")[1])));
};
var AddUser = function (req, res) {
    res.send(menudb.INSERT(GetLevel(req.headers.authorization.split(" ")[1])));
    //GetLevel(req)
};
var PutUser = function (req, res) {
    res.send(menudb.UPDATE(GetLevel(req.headers.authorization.split(" ")[1])));
};
var DelUser = function (req, res) {
    res.send(menudb.DELETE(GetLevel(req.headers.authorization.split(" ")[1])));
};
module.exports = {
    Login: Login,
    AddUser: AddUser,
    GetUser: GetUser,
    PutUser: PutUser,
    DelUser: DelUser
};
