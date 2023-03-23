"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuDB = void 0;
var MenuDB = /** @class */ (function () {
    function MenuDB() {
    }
    // yetki değerini döner
    // a role alır
    //b yetkki indeksini alır
    // 4 haneli rol için index anlamları
    // 0 = okuma
    // 1 = yazma
    // 2 = güncelleme
    // 3 = silme
    MenuDB.prototype.SPLIT = function (a, b) {
        return a.split("")[b];
    };
    // yetki değerine göre yetkinin olup olmadığını döner
    MenuDB.prototype.AUTH = function (role, i) {
        var y = this.SPLIT(role.toString(), i), s;
        parseInt(y) > 0 ? s = true : s = false;
        return s;
    };
    MenuDB.prototype.INSERT = function (user) {
        var res;
        if (this.AUTH(user.role, 1)) {
            res = { code: 0, msg: "Kayıt işlemi İçin Yetkiniz Var", data: {} };
        }
        else {
            res = { code: 1, msg: "Kayıt İşlemi için Yetkiniz Yok", data: {} };
        }
        return res;
    };
    MenuDB.prototype.SELECT = function (user) {
        var res;
        if (this.AUTH(user.role, 2)) {
            res = { code: 0, msg: "Okuma işlemi İçin Yetkiniz Var", data: {} };
        }
        else {
            res = { code: 1, msg: "Okuma İşlemi için Yetkiniz Yok", data: {} };
        }
        return res;
    };
    MenuDB.prototype.UPDATE = function (user) {
        var res;
        if (this.AUTH(user.role, 3)) {
            res = { code: 0, msg: "Güncelleme işlemi İçin Yetkiniz Var", data: {} };
        }
        else {
            res = { code: 1, msg: "Güncelleme İşlemi için Yetkiniz Yok", data: {} };
        }
        return res;
    };
    MenuDB.prototype.DELETE = function (user) {
        var res;
        if (this.AUTH(user.role, 4)) {
            res = { code: 0, msg: "Silme işlemi İçin Yetkiniz Var", data: {} };
        }
        else {
            res = { code: 1, msg: "Silme İşlemi için Yetkiniz Yok", data: {} };
        }
        return res;
    };
    return MenuDB;
}());
exports.MenuDB = MenuDB;
